// // Free Map API Key

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
//   Modal,
//   Fade,
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
//   NavigateBefore as NavigateBeforeIcon,
//   NavigateNext as NavigateNextIcon,
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
//   if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [], remark: null };

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
//     remark: session.remark || null,
//   };
// };

// // ─── Marker factories ──────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makeEndIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makePhotoIcon = (photoUrl, time, size = 28) =>
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

// const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
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

// const makeEndWithPhotoIcon = (photoUrl, time, size = 34) =>
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
//   const [activeDrawer, setActiveDrawer] = useState(null);
//   const [sessionPhotos, setSessionPhotos] = useState([]);
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
//   const [photoModalOpen, setPhotoModalOpen] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const markerRefs = useRef(new Map());
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());

//   const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
//   const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);
//   const drawerOpen = activeDrawer === "sessions";
//   const drawerPaperSx = {
//     width: { xs: "85%", sm: 300 },
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16,
//   };

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
//     const lastPhoto = sortedPhotos[sortedPhotos.length - 1];
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

//   const buildSessionPhotos = useCallback((session) => {
//     if (!session) return [];
//     const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
//     const result = [];
//     const seenUrls = new Set();
//     const seenLatLng = new Set();
//     const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

//     if (sp && sp.photo && !seenUrls.has(sp.photo)) {
//       const latLngKey = getLatLngKey(sp.lat, sp.lng);
//       if (!seenLatLng.has(latLngKey)) {
//         seenUrls.add(sp.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "start", url: sp.photo, timestamp: sp.timestamp, address: sp.address, lat: sp.lat, lng: sp.lng, type: "start" });
//       }
//     }

//     const rawPhotos = session.photos || [];
//     rawPhotos.forEach((photo, idx) => {
//       if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//       if (seenUrls.has(photo.url)) return;
//       const pLat = getLat(photo.location);
//       const pLng = getLng(photo.location);
//       const latLngKey = getLatLngKey(pLat, pLng);
//       if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
//       if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
//       if (seenLatLng.has(latLngKey)) return;
//       seenUrls.add(photo.url);
//       seenLatLng.add(latLngKey);
//       result.push({ key: `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type: "route" });
//     });

//     if (ep && ep.photo && !seenUrls.has(ep.photo)) {
//       const latLngKey = getLatLngKey(ep.lat, ep.lng);
//       if (!(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng)) && !seenLatLng.has(latLngKey)) {
//         seenUrls.add(ep.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "end", url: ep.photo, timestamp: ep.timestamp, address: ep.address, lat: ep.lat, lng: ep.lng, type: "end" });
//       }
//     }
//     return result;
//   }, [getStartEndFromPhotos]);

//   // Fetch available dates
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;
//     if (userId && dateToUse) {
//       dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

//   // Init sessions — also try to pull remark from sessionDataCache if already fetched
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

//       if (isMobile) setActiveDrawer("sessions");
//     },
//     [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
//   );

//   // Watch Redux sessionDetails — update remark in allSessions list too
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

//       setAllSessions((prev) =>
//         prev.map((s) =>
//           String(s.sessionId || s._id) === id
//             ? { ...s, remark: sessionDetails.remark || s.remark }
//             : s
//         )
//       );

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

//   // Custom popup styling with smaller size
//   const createCustomPopup = (content, isSmall = false) => {
//     const popupDiv = document.createElement('div');
//     popupDiv.innerHTML = content;
//     popupDiv.style.minWidth = isSmall ? '180px' : '220px';
//     popupDiv.style.maxWidth = isSmall ? '240px' : '280px';
//     popupDiv.style.fontSize = '11px';
//     return popupDiv;
//   };

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

//     if (startPoint && hasValidCoordinates(startPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;">
//         <div style="background:#22c55e;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px">🚀</span><b style="font-size:12px">START POINT</b></div>
//         </div>
//         <div style="font-size:11px"><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
//         <div style="font-size:11px"><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
//         <div style="margin-top:6px;border-top:1px solid #ddd;padding-top:6px;">
//           <b style="font-size:11px">📸 Start Photo</b><br/>
//           <img src="${startPoint.photo}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:4px;" onclick="window.open('${startPoint.photo}','_blank')"/>
//         </div>
//       </div>`;
//       const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34);
//       const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     } else if (validLocations.length > 0) {
//       const fb = validLocations[0];
//       const popupContent = `<div style="min-width:160px;max-width:200px;">
//         <div style="background:#22c55e;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🚀</span><b style="font-size:11px">START POINT</b></div>
//         </div>
//         <div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
//         <div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
//       </div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     }

//     if (endPoint && hasValidCoordinates(endPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;">
//         <div style="background:#ef4444;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px">🏁</span><b style="font-size:12px">END POINT</b></div>
//         </div>
//         <div style="font-size:11px"><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
//         <div style="font-size:11px"><b>Date:</b> ${fmtDate(endPoint.timestamp)}</div>
//         <div style="margin-top:6px;border-top:1px solid #ddd;padding-top:6px;">
//           <b style="font-size:11px">📸 End Photo</b><br/>
//           <img src="${endPoint.photo}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:4px;" onclick="window.open('${endPoint.photo}','_blank')"/>
//         </div>
//       </div>`;
//       const icon = makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 34);
//       const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     } else if (validLocations.length > 1) {
//       const fb = validLocations[validLocations.length - 1];
//       const popupContent = `<div style="min-width:160px;max-width:200px;">
//         <div style="background:#ef4444;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🏁</span><b style="font-size:11px">END POINT</b></div>
//         </div>
//         <div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
//         <div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
//         <div style="font-size:10px"><b>Address:</b> ${getAddress(fb)}</div>
//       </div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeEndIcon("#ef4444", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     }

//     if (showPhotos && session.photos && session.photos.length > 0) {
//       session.photos.forEach((photo, idx) => {
//         if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//         const lat = photo.location.lat || photo.location.latitude;
//         const lng = photo.location.lng || photo.location.longitude;
//         if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
//         if (endPoint && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;
//         const popup = `<div style="min-width:180px;max-width:240px;">
//           <div style="background:#FF9800;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;"><b style="font-size:12px">📸 ROUTE PHOTO</b></div>
//           <div style="font-size:11px"><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
//           <div style="font-size:11px"><b>Remark:</b> ${photo.remark || "Remark not available"}</div>
//           <div style="margin-top:6px;"><img src="${photo.url}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photo.url}','_blank')"/></div>
//         </div>`;
//         const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28), zIndexOffset: 950 })
//           .bindPopup(popup, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
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

//   useEffect(() => {
//     if (mapInstance.current && selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

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

//   const handlePhotoClick = (photo) => {
//     if (!mapInstance.current) return;
//     const markerKey = photo.key;
//     if (markerRefs.current.has(markerKey)) {
//       const m = markerRefs.current.get(markerKey);
//       const latLng = m.getLatLng();
//       mapInstance.current.setView(latLng, 18, { animate: true, duration: 1.5 });
//       setTimeout(() => m.openPopup(), 1500);
//       return;
//     }
//     if (photo.lat && photo.lng) {
//       mapInstance.current.setView([photo.lat, photo.lng], 18, { animate: true, duration: 1.5 });
//     }
//   };

//   // ─── Photo Carousel ────────────────────────────────────────────────────────
//   const renderPhotoCarousel = () => {
//     if (!selectedSession || sessionPhotos.length === 0) return null;
//     return (
//       <Paper
//         elevation={3}
//         sx={{
//           position: "absolute",
//           bottom: 20,
//           left: 16,
//           right: 16,
//           zIndex: 600,
//           bgcolor: "rgba(0,0,0,0.4)",
//           backdropFilter: "blur(10px)",
//           borderRadius: 2,
//           p: 0.5,
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, px: 0.5 }}>
//           <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//           <Typography variant="caption" sx={{ color: "white", fontWeight: 500, fontSize: "10px" }}>
//             Session Photos ({sessionPhotos.length})
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 0.75,
//             overflowX: "auto",
//             overflowY: "hidden",
//             pb: 0.5,
//             "&::-webkit-scrollbar": { height: 3 },
//             "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 },
//             "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2 },
//           }}
//         >
//           {sessionPhotos.map((photo, index) => {
//             const isStart = photo.type === "start";
//             const isEnd = photo.type === "end";
//             const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";
//             return (
//               <Box
//                 key={photo.key || index}
//                 onClick={() => handlePhotoClick(photo)}
//                 sx={{
//                   flexShrink: 0, width: 60, height: 60, borderRadius: 1, overflow: "hidden",
//                   cursor: "pointer", border: `1.5px solid ${borderColor}`, position: "relative",
//                   transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" },
//                 }}
//               >
//                 <img src={photo.url} alt={`Photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
//                   {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
//                 </Box>
//                 <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.6)", color: "white", fontSize: "7px", textAlign: "center", py: 0.15 }}>
//                   {fmtTime(photo.timestamp)}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Paper>
//     );
//   };

//   // ─── Photo Modal ───────────────────────────────────────────────────────────
//   const renderPhotoModal = () => {
//     if (!photoModalOpen || selectedPhotoIndex === null) return null;
//     const currentPhoto = sessionPhotos[selectedPhotoIndex];
//     const handleNext = () => setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
//     const handlePrev = () => setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
//     return (
//       <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} closeAfterTransition sx={{ zIndex: 1300 }}>
//         <Fade in={photoModalOpen}>
//           <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 800, bgcolor: "black", borderRadius: 2, boxShadow: 24, overflow: "hidden" }}>
//             <Box sx={{ position: "relative" }}>
//               <IconButton onClick={() => setPhotoModalOpen(false)} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
//                 <CloseIcon />
//               </IconButton>
//               <img src={currentPhoto?.url} alt="Full size" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
//               <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
//                 <NavigateBeforeIcon />
//               </IconButton>
//               <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
//                 <NavigateNextIcon />
//               </IconButton>
//             </Box>
//             <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
//               <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
//                 {currentPhoto?.type === "start" ? "🚀 Start Point" : currentPhoto?.type === "end" ? "🏁 End Point" : `📸 Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`}
//               </Typography>
//               <Typography variant="caption" display="block" color="text.secondary">{fmtDateTime(currentPhoto?.timestamp)}</Typography>
//               <Typography variant="caption" display="block" color="text.secondary">📍 {currentPhoto?.address || "Address not available"}</Typography>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     );
//   };

//   // ── Session List with smaller card size ──────────────────────────────────────────
//   // const renderSessionList = () => (
//   //   <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//   //     <Box sx={{ p: 1 }}>
//   //       <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.7rem", mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
//   //         <PinDropIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//   //         Sessions ({allSessions.length})
//   //         {(selectedDate || metadata?.selectedDate) && (
//   //           <Chip label={selectedDate || metadata?.selectedDate} size="small" sx={{ ml: "auto", height: 18, fontSize: "0.5rem", bgcolor: alpha("#2196F3", 0.1), color: "#2196F3" }} />
//   //         )}
//   //       </Typography>

//   //       <Stack spacing={1}>
//   //         {allSessions.map((session, index) => {
//   //           const sessionId = String(session.sessionId || session._id);
//   //           const isSelected = String(selectedSessionId) === sessionId;
//   //           const isLoading = isSelected && isLoadingSession;
//   //           const photoCount = getPhotoCount(session);
//   //           const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

//   //           const cachedSession = sessionDataCache.current.get(sessionId);
//   //           const displayRemark = session.remark || cachedSession?.remark || null;

//   //           return (
//   //             <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//   //               <Card
//   //                 onClick={() => handleSessionSelect(sessionId)}
//   //                 sx={{
//   //                   cursor: "pointer",
//   //                   border: isSelected ? `1.5px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//   //                   bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//   //                   transition: "all 0.2s ease",
//   //                   "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02), transform: "translateY(-1px)", boxShadow: 1 },
//   //                 }}
//   //               >
//   //                 <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
//   //                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
//   //                     <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#2196F3", fontSize: "0.7rem", fontWeight: "bold" }}>
//   //                       {isLoading ? <CircularProgress size={16} /> : index + 1}
//   //                     </Box>
//   //                     <Box sx={{ flex: 1 }}>
//   //                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem" }}>
//   //                         {displayRemark || `Session #${index + 1}`}
//   //                       </Typography>
//   //                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem", display: "flex", alignItems: "center", gap: 0.5 }}>
//   //                         <ScheduleIcon sx={{ fontSize: 9 }} />
//   //                         {fmtDateTime(session.startTime || session.stats?.startTime)}
//   //                       </Typography>
//   //                     </Box>
//   //                     {photoCount > 0 && (
//   //                       <Chip icon={<PhotoIcon sx={{ fontSize: 11 }} />} label={photoCount} size="small" sx={{ height: 20, fontSize: "0.55rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
//   //                     )}
//   //                   </Box>

//   //                   <Grid container spacing={0.75} sx={{ mb: 0.75 }}>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//   //                         <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Duration</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtDuration(stats.duration)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//   //                         <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Distance</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtDist(stats.distance)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                   </Grid>

//   //                   <Divider sx={{ my: 0.75 }} />

//   //                   <Grid container spacing={0.75}>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//   //                         <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Start</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.55rem", display: "block" }}>{fmtTime(stats.startTime)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//   //                         <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>End</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.55rem", display: "block" }}>{fmtTime(stats.endTime)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                   </Grid>
//   //                 </CardContent>
//   //               </Card>
//   //             </Zoom>
//   //           );
//   //         })}
//   //       </Stack>
//   //     </Box>
//   //   </Paper>
//   // );
// const renderSessionList = () => (
//   <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0, bgcolor: "transparent" }}>
//     <Box sx={{ p: 0.75 }}>
//       {/* Stylish Header */}
//       <Box sx={{ 
//         display: "flex", 
//         alignItems: "center", 
//         justifyContent: "space-between",
//         mb: 1.5,
//         pb: 0.75,
//         borderBottom: `2px solid ${alpha("#2196F3", 0.2)}`,
//       }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
//           <Box sx={{ 
//             width: 28, 
//             height: 28, 
//             borderRadius: "50%", 
//             background: `linear-gradient(135deg, #2196F3, #1976D2)`,
//             display: "flex", 
//             alignItems: "center", 
//             justifyContent: "center",
//             boxShadow: `0 2px 8px ${alpha("#2196F3", 0.3)}`
//           }}>
//             <PinDropIcon sx={{ fontSize: 14, color: "white" }} />
//           </Box>
//           <Typography variant="subtitle2" fontWeight={700} sx={{ 
//             fontSize: "0.7rem", 
//             background: `linear-gradient(135deg, #2196F3, #1976D2)`,
//             backgroundClip: "text",
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//             letterSpacing: "0.5px"
//           }}>
//             SESSIONS
//           </Typography>
//           <Chip 
//             label={allSessions.length} 
//             size="small" 
//             sx={{ 
//               height: 18, 
//               fontSize: "0.55rem", 
//               fontWeight: 700,
//               bgcolor: alpha("#2196F3", 0.15),
//               color: "#2196F3",
//               borderRadius: "8px"
//             }} 
//           />
//         </Box>
//         {(selectedDate || metadata?.selectedDate) && (
//           <Chip 
//             label={selectedDate || metadata?.selectedDate} 
//             size="small" 
//             sx={{ 
//               height: 20, 
//               fontSize: "0.5rem", 
//               fontWeight: 500,
//               bgcolor: alpha("#2196F3", 0.1), 
//               color: "#2196F3",
//               borderRadius: "6px",
//               border: `1px solid ${alpha("#2196F3", 0.2)}`
//             }} 
//           />
//         )}
//       </Box>

//       <Stack spacing={1}>
//         {[...allSessions].reverse().map((session, index) => {
//           const sessionId = String(session.sessionId || session._id);
//           const isSelected = String(selectedSessionId) === sessionId;
//           const isLoading = isSelected && isLoadingSession;
//           const photoCount = getPhotoCount(session);
//           const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

//           const cachedSession = sessionDataCache.current.get(sessionId);
//           const displayRemark = session.remark || cachedSession?.remark || null;

//           return (
//             <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//               <Card
//                 onClick={() => handleSessionSelect(sessionId)}
//                 sx={{
//                   cursor: "pointer",
//                   position: "relative",
//                   overflow: "visible",
//                   background: isSelected 
//                     ? `linear-gradient(135deg, ${alpha("#2196F3", 0.08)}, ${alpha("#1976D2", 0.04)})`
//                     : "rgba(255, 255, 255, 0.6)",
//                   backdropFilter: "blur(10px)",
//                   border: isSelected 
//                     ? `1.5px solid ${alpha("#2196F3", 0.5)}`
//                     : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
//                   borderRadius: "12px",
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   "&:hover": { 
//                     borderColor: alpha("#2196F3", 0.6),
//                     background: `linear-gradient(135deg, ${alpha("#2196F3", 0.05)}, ${alpha("#1976D2", 0.02)})`,
//                     transform: "translateY(-2px) translateX(2px)",
//                     boxShadow: `0 4px 12px ${alpha("#2196F3", 0.15)}`,
//                   },
//                   ...(isSelected && {
//                     "&::before": {
//                       content: '""',
//                       position: "absolute",
//                       left: 0,
//                       top: "20%",
//                       height: "60%",
//                       width: "3px",
//                       background: `linear-gradient(135deg, #2196F3, #1976D2)`,
//                       borderRadius: "0 4px 4px 0",
//                     }
//                   })
//                 }}
//               >
//                 <CardContent sx={{ p: 0.85, '&:last-child': { pb: 0.85 } }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, mb: 0.6 }}>
//                     {/* Stylish Number Badge */}
//                     <Box sx={{ 
//                       width: 26, 
//                       height: 26, 
//                       borderRadius: "10px",
//                       background: isSelected 
//                         ? `linear-gradient(135deg, #2196F3, #1976D2)`
//                         : `linear-gradient(135deg, ${alpha("#2196F3", 0.15)}, ${alpha("#1976D2", 0.08)})`,
//                       display: "flex", 
//                       alignItems: "center", 
//                       justifyContent: "center",
//                       boxShadow: isSelected ? `0 2px 6px ${alpha("#2196F3", 0.3)}` : "none",
//                       transition: "all 0.2s ease"
//                     }}>
//                       {isLoading ? (
//                         <CircularProgress size={14} sx={{ color: isSelected ? "white" : "#2196F3" }} />
//                       ) : (
//                         <Typography fontWeight={700} sx={{ 
//                           fontSize: "0.65rem", 
//                           color: isSelected ? "white" : "#2196F3",
//                           textShadow: isSelected ? "0 1px 2px rgba(0,0,0,0.1)" : "none"
//                         }}>
//                           {index + 1}
//                         </Typography>
//                       )}
//                     </Box>

//                     <Box sx={{ flex: 1 }}>
//                       <Typography fontWeight={700} sx={{ 
//                         fontSize: "0.7rem", 
//                         color: isSelected ? "#2196F3" : "text.primary",
//                         letterSpacing: "0.3px",
//                         mb: 0.25
//                       }}>
//                         {displayRemark || `Session #${index + 1}`}
//                       </Typography>
//                       {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                         <ScheduleIcon sx={{ fontSize: 8, color: alpha("#2196F3", 0.6) }} />
//                         <Typography variant="caption" sx={{ 
//                           fontSize: "0.5rem", 
//                           color: "text.secondary",
//                           fontWeight: 500
//                         }}>
//                           {fmtDateTime(session.startTime || session.stats?.startTime)}
//                         </Typography>
//                       </Box> */}
//                     </Box>

//                     {photoCount > 0 && (
//                       <Box sx={{ 
//                         display: "flex", 
//                         alignItems: "center", 
//                         gap: 0.25,
//                         bgcolor: alpha("#FF9800", 0.1),
//                         borderRadius: "12px",
//                         px: 0.65,
//                         py: 0.3,
//                         border: `1px solid ${alpha("#FF9800", 0.2)}`
//                       }}>
//                         <PhotoIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                         <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#FF9800" }}>
//                           {photoCount}
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>

//                   {/* Stats Cards */}
//                   <Grid container spacing={0.6} sx={{ mb: 0.6 }}>
//                     <Grid item xs={6}>
//                       <Box sx={{ 
//                         display: "flex", 
//                         alignItems: "center", 
//                         gap: 0.6, 
//                         p: 0.5, 
//                         bgcolor: alpha("#FF9800", 0.04), 
//                         borderRadius: "8px",
//                         border: `1px solid ${alpha("#FF9800", 0.08)}`,
//                         transition: "all 0.2s ease",
//                         "&:hover": {
//                           bgcolor: alpha("#FF9800", 0.08),
//                           borderColor: alpha("#FF9800", 0.15)
//                         }
//                       }}>
//                         <Box sx={{ 
//                           width: 24, 
//                           height: 24, 
//                           borderRadius: "6px", 
//                           bgcolor: alpha("#FF9800", 0.1),
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center"
//                         }}>
//                           <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                         </Box>
//                         <Box>
//                           <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                             Duration
//                           </Typography>
//                           <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#FF9800" }}>
//                             {fmtDuration(stats.duration)}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ 
//                         display: "flex", 
//                         alignItems: "center", 
//                         gap: 0.6, 
//                         p: 0.5, 
//                         bgcolor: alpha("#2196F3", 0.04), 
//                         borderRadius: "8px",
//                         border: `1px solid ${alpha("#2196F3", 0.08)}`,
//                         transition: "all 0.2s ease",
//                         "&:hover": {
//                           bgcolor: alpha("#2196F3", 0.08),
//                           borderColor: alpha("#2196F3", 0.15)
//                         }
//                       }}>
//                         <Box sx={{ 
//                           width: 24, 
//                           height: 24, 
//                           borderRadius: "6px", 
//                           bgcolor: alpha("#2196F3", 0.1),
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center"
//                         }}>
//                           <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                         </Box>
//                         <Box>
//                           <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                             Distance
//                           </Typography>
//                           <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#2196F3" }}>
//                             {fmtDist(stats.distance)}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   <Divider sx={{ 
//                     my: 0.6, 
//                     borderColor: alpha(theme.palette.divider, 0.3),
//                     background: `linear-gradient(90deg, transparent, ${alpha("#2196F3", 0.2)}, transparent)`
//                   }} />

//                   {/* Start/End Points */}
//                   <Grid container spacing={0.6}>
//                     <Grid item xs={6}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                         <Box sx={{ 
//                           width: 20, 
//                           height: 20, 
//                           borderRadius: "6px", 
//                           bgcolor: alpha("#22c55e", 0.1),
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center"
//                         }}>
//                           <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                         </Box>
//                         <Box>
//                           <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>
//                             START
//                           </Typography>
//                           <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#22c55e" }}>
//                             {fmtTime(stats.startTime)}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                         <Box sx={{ 
//                           width: 20, 
//                           height: 20, 
//                           borderRadius: "6px", 
//                           bgcolor: alpha("#ef4444", 0.1),
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center"
//                         }}>
//                           <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                         </Box>
//                         <Box>
//                           <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>
//                             END
//                           </Typography>
//                           <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#ef4444" }}>
//                             {fmtTime(stats.endTime)}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   {/* Selected Session Indicator */}
//                   {isSelected && (
//                     <Box sx={{ 
//                       position: "absolute", 
//                       bottom: 8, 
//                       right: 8,
//                       width: 6,
//                       height: 6,
//                       borderRadius: "50%",
//                       bgcolor: "#2196F3",
//                       boxShadow: `0 0 0 2px ${alpha("#2196F3", 0.2)}`
//                     }} />
//                   )}
//                 </CardContent>
//               </Card>
//             </Zoom>
//           );
//         })}
//       </Stack>
//     </Box>
//   </Paper>
// );
//   const selectedSessionListItem = allSessions.find(
//     (session) => String(session.sessionId || session._id) === String(selectedSessionId)
//   );
//   const selectedSessionCachedData = selectedSessionId
//     ? sessionDataCache.current.get(String(selectedSessionId))
//     : null;
//   const selectedSessionRemark =
//     selectedSession?.remark ||
//     selectedSessionListItem?.remark ||
//     selectedSessionCachedData?.remark ||
//     null;
//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper", overflow: "hidden" }}>
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
//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0, height: "calc(100vh - 48px)", overflow: "hidden" }}>
//         <Grid container sx={{ height: "100%" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "100%", backgroundColor: "#f0f0f0" }} />

//             {isLoadingSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 50, p: { xs: 0.75, sm: 1 }, borderRadius: 2, maxWidth: { xs: 180, sm: 220 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)",  bgcolor: "rgba(255, 255, 255, 0.3)"  }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.65rem", sm: "0.7rem" }, mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <PinDropIcon sx={{ fontSize: 12 }} />
//                   {selectedSessionRemark || "No remark added"}
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 0.75, mb: 0.5 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 10, color: "#2196F3" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>
//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e", fontSize: "0.55rem" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444", fontSize: "0.55rem" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}

//             {renderPhotoCarousel()}
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
//           <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
//             <MenuIcon />
//           </Fab>
//           <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
//             <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
//                 {(selectedDate || metadata?.selectedDate) && (
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>{selectedDate || metadata?.selectedDate}</Typography>
//                 )}
//               </Box>
//               <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 56px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}

//       {renderPhotoModal()}
//     </Box>
//   );
// };

// export default Locations;

























// Google API Keys Map


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
//   Modal,
//   Fade,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   DarkMode as DarkModeIcon,
//   LightMode as LightModeIcon,
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
//   NavigateBefore as NavigateBeforeIcon,
//   NavigateNext as NavigateNextIcon,
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
//   if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [], remark: null };

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
//     remark: session.remark || null,
//   };
// };

// // ─── Marker factories ──────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makeEndIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makePhotoIcon = (photoUrl, time, size = 28) =>
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

// const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
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

// const makeEndWithPhotoIcon = (photoUrl, time, size = 34) =>
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
//   const [activeDrawer, setActiveDrawer] = useState(null);
//   const [sessionPhotos, setSessionPhotos] = useState([]);
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
//   const [photoModalOpen, setPhotoModalOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const markerRefs = useRef(new Map());
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());

//   const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
//   const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);
//   const drawerOpen = activeDrawer === "sessions";
//   const drawerPaperSx = {
//     width: { xs: "85%", sm: 300 },
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16,
//   };

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
//     const lastPhoto = sortedPhotos[sortedPhotos.length - 1];
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

//   const buildSessionPhotos = useCallback((session) => {
//     if (!session) return [];
//     const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
//     const result = [];
//     const seenUrls = new Set();
//     const seenLatLng = new Set();
//     const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

//     if (sp && sp.photo && !seenUrls.has(sp.photo)) {
//       const latLngKey = getLatLngKey(sp.lat, sp.lng);
//       if (!seenLatLng.has(latLngKey)) {
//         seenUrls.add(sp.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "start", url: sp.photo, timestamp: sp.timestamp, address: sp.address, lat: sp.lat, lng: sp.lng, type: "start" });
//       }
//     }

//     const rawPhotos = session.photos || [];
//     rawPhotos.forEach((photo, idx) => {
//       if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//       if (seenUrls.has(photo.url)) return;
//       const pLat = getLat(photo.location);
//       const pLng = getLng(photo.location);
//       const latLngKey = getLatLngKey(pLat, pLng);
//       if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
//       if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
//       if (seenLatLng.has(latLngKey)) return;
//       seenUrls.add(photo.url);
//       seenLatLng.add(latLngKey);
//       result.push({ key: `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type: "route" });
//     });

//     if (ep && ep.photo && !seenUrls.has(ep.photo)) {
//       const latLngKey = getLatLngKey(ep.lat, ep.lng);
//       if (!(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng)) && !seenLatLng.has(latLngKey)) {
//         seenUrls.add(ep.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "end", url: ep.photo, timestamp: ep.timestamp, address: ep.address, lat: ep.lat, lng: ep.lng, type: "end" });
//       }
//     }
//     return result;
//   }, [getStartEndFromPhotos]);

//   // Fetch available dates
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;
//     if (userId && dateToUse) {
//       dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

//   // Init sessions — also try to pull remark from sessionDataCache if already fetched
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

//       if (isMobile) setActiveDrawer("sessions");
//     },
//     [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
//   );

//   // Watch Redux sessionDetails — update remark in allSessions list too
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

//       setAllSessions((prev) =>
//         prev.map((s) =>
//           String(s.sessionId || s._id) === id
//             ? { ...s, remark: sessionDetails.remark || s.remark }
//             : s
//         )
//       );

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

//   // Custom popup styling with smaller size
//   const createCustomPopup = (content, isSmall = false) => {
//     const popupDiv = document.createElement('div');
//     popupDiv.innerHTML = content;
//     popupDiv.style.minWidth = isSmall ? '180px' : '220px';
//     popupDiv.style.maxWidth = isSmall ? '240px' : '280px';
//     popupDiv.style.fontSize = '11px';
//     return popupDiv;
//   };

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

//     if (startPoint && hasValidCoordinates(startPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;">
//         <div style="background:#22c55e;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px">🚀</span><b style="font-size:12px">START POINT</b></div>
//         </div>
//         <div style="font-size:11px"><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
//         <div style="font-size:11px"><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
//         <div style="margin-top:6px;border-top:1px solid #ddd;padding-top:6px;">
//           <b style="font-size:11px">📸 Start Photo</b><br/>
//           <img src="${startPoint.photo}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:4px;" onclick="window.open('${startPoint.photo}','_blank')"/>
//         </div>
//       </div>`;
//       const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34);
//       const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     } else if (validLocations.length > 0) {
//       const fb = validLocations[0];
//       const popupContent = `<div style="min-width:160px;max-width:200px;">
//         <div style="background:#22c55e;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🚀</span><b style="font-size:11px">START POINT</b></div>
//         </div>
//         <div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
//         <div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
//       </div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     }

//     if (endPoint && hasValidCoordinates(endPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;">
//         <div style="background:#ef4444;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px">🏁</span><b style="font-size:12px">END POINT</b></div>
//         </div>
//         <div style="font-size:11px"><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
//         <div style="font-size:11px"><b>Date:</b> ${fmtDate(endPoint.timestamp)}</div>
//         <div style="margin-top:6px;border-top:1px solid #ddd;padding-top:6px;">
//           <b style="font-size:11px">📸 End Photo</b><br/>
//           <img src="${endPoint.photo}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:4px;" onclick="window.open('${endPoint.photo}','_blank')"/>
//         </div>
//       </div>`;
//       const icon = makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 34);
//       const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     } else if (validLocations.length > 1) {
//       const fb = validLocations[validLocations.length - 1];
//       const popupContent = `<div style="min-width:160px;max-width:200px;">
//         <div style="background:#ef4444;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
//           <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🏁</span><b style="font-size:11px">END POINT</b></div>
//         </div>
//         <div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
//         <div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
//         <div style="font-size:10px"><b>Address:</b> ${getAddress(fb)}</div>
//       </div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeEndIcon("#ef4444", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     }

//     if (showPhotos && session.photos && session.photos.length > 0) {
//       session.photos.forEach((photo, idx) => {
//         if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//         const lat = photo.location.lat || photo.location.latitude;
//         const lng = photo.location.lng || photo.location.longitude;
//         if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
//         if (endPoint && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;
//         const popup = `<div style="min-width:180px;max-width:240px;">
//           <div style="background:#FF9800;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;"><b style="font-size:12px">📸 ROUTE PHOTO</b></div>
//           <div style="font-size:11px"><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
//           <div style="font-size:11px"><b>Remark:</b> ${photo.remark || "Remark not available"}</div>
//           <div style="margin-top:6px;"><img src="${photo.url}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photo.url}','_blank')"/></div>
//         </div>`;
//         const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28), zIndexOffset: 950 })
//           .bindPopup(popup, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
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

//     // const apiKey = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";
//     const apiKey = import.meta.env.VITE_GOOGLE_MAP_APIKEY;
//     const googleRoadmap = L.tileLayer(`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`, {
//       attribution: "&copy; Google Maps",
//       maxZoom: 19,
//     });

//     const googleSatellite = L.tileLayer(`https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&key=${apiKey}`, {
//       attribution: "&copy; Google Satellite",
//       maxZoom: 19,
//     });

//     const googleHybrid = L.tileLayer(`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey}`, {
//       attribution: "&copy; Google Hybrid",
//       maxZoom: 19,
//     });

//     const googleTerrain = L.tileLayer(`https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${apiKey}`, {
//       attribution: "&copy; Google Terrain",
//       maxZoom: 19,
//     });

//     const baseMaps = {
//       "Roadmap": googleRoadmap,
//       "Satellite": googleSatellite,
//       "Hybrid": googleHybrid,
//       "Terrain": googleTerrain
//     };

//     googleRoadmap.addTo(map);
//     L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   useEffect(() => {
//     if (mapInstance.current && selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const tilePane = document.querySelector('.leaflet-tile-pane');
//     if (tilePane) {
//       tilePane.style.filter = isDarkMode ? "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none";
//       tilePane.style.transition = "filter 0.3s ease";
//     }
//   }, [isDarkMode, isMapInitialized]);

//   const getPhotoCount = (session) => {
//     if (!session) return 0;
//     return session.photos?.length || 0;
//   };

//   const handlePhotoClick = (photo) => {
//     if (!mapInstance.current) return;
//     const markerKey = photo.key;
//     if (markerRefs.current.has(markerKey)) {
//       const m = markerRefs.current.get(markerKey);
//       const latLng = m.getLatLng();
//       mapInstance.current.setView(latLng, 18, { animate: true, duration: 1.5 });
//       setTimeout(() => m.openPopup(), 1500);
//       return;
//     }
//     if (photo.lat && photo.lng) {
//       mapInstance.current.setView([photo.lat, photo.lng], 18, { animate: true, duration: 1.5 });
//     }
//   };

//   // ─── Photo Carousel ────────────────────────────────────────────────────────
//   const renderPhotoCarousel = () => {
//     if (!selectedSession || sessionPhotos.length === 0) return null;
//     return (
//       <Paper
//         elevation={3}
//         sx={{
//           position: "absolute",
//           bottom: 20,
//           left: 16,
//           right: 16,
//           zIndex: 600,
//           bgcolor: "rgba(0,0,0,0.4)",
//           backdropFilter: "blur(10px)",
//           borderRadius: 2,
//           p: 0.5,
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, px: 0.5 }}>
//           <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//           <Typography variant="caption" sx={{ color: "white", fontWeight: 500, fontSize: "10px" }}>
//             Session Photos ({sessionPhotos.length})
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 0.75,
//             overflowX: "auto",
//             overflowY: "hidden",
//             pb: 0.5,
//             "&::-webkit-scrollbar": { height: 3 },
//             "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 },
//             "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2 },
//           }}
//         >
//           {sessionPhotos.map((photo, index) => {
//             const isStart = photo.type === "start";
//             const isEnd = photo.type === "end";
//             const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";
//             return (
//               <Box
//                 key={photo.key || index}
//                 onClick={() => handlePhotoClick(photo)}
//                 sx={{
//                   flexShrink: 0, width: 60, height: 60, borderRadius: 1, overflow: "hidden",
//                   cursor: "pointer", border: `1.5px solid ${borderColor}`, position: "relative",
//                   transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" },
//                 }}
//               >
//                 <img src={photo.url} alt={`Photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
//                   {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
//                 </Box>
//                 <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.6)", color: "white", fontSize: "7px", textAlign: "center", py: 0.15 }}>
//                   {fmtTime(photo.timestamp)}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Paper>
//     );
//   };

//   // ─── Photo Modal ───────────────────────────────────────────────────────────
//   const renderPhotoModal = () => {
//     if (!photoModalOpen || selectedPhotoIndex === null) return null;
//     const currentPhoto = sessionPhotos[selectedPhotoIndex];
//     const handleNext = () => setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
//     const handlePrev = () => setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
//     return (
//       <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} closeAfterTransition sx={{ zIndex: 1300 }}>
//         <Fade in={photoModalOpen}>
//           <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 800, bgcolor: "black", borderRadius: 2, boxShadow: 24, overflow: "hidden" }}>
//             <Box sx={{ position: "relative" }}>
//               <IconButton onClick={() => setPhotoModalOpen(false)} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
//                 <CloseIcon />
//               </IconButton>
//               <img src={currentPhoto?.url} alt="Full size" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
//               <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
//                 <NavigateBeforeIcon />
//               </IconButton>
//               <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
//                 <NavigateNextIcon />
//               </IconButton>
//             </Box>
//             <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
//               <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
//                 {currentPhoto?.type === "start" ? "🚀 Start Point" : currentPhoto?.type === "end" ? "🏁 End Point" : `📸 Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`}
//               </Typography>
//               <Typography variant="caption" display="block" color="text.secondary">{fmtDateTime(currentPhoto?.timestamp)}</Typography>
//               <Typography variant="caption" display="block" color="text.secondary">📍 {currentPhoto?.address || "Address not available"}</Typography>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     );
//   };

//   // ── Session List with smaller card size ──────────────────────────────────────────
//   // const renderSessionList = () => (
//   //   <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//   //     <Box sx={{ p: 1 }}>
//   //       <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.7rem", mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
//   //         <PinDropIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//   //         Sessions ({allSessions.length})
//   //         {(selectedDate || metadata?.selectedDate) && (
//   //           <Chip label={selectedDate || metadata?.selectedDate} size="small" sx={{ ml: "auto", height: 18, fontSize: "0.5rem", bgcolor: alpha("#2196F3", 0.1), color: "#2196F3" }} />
//   //         )}
//   //       </Typography>

//   //       <Stack spacing={1}>
//   //         {allSessions.map((session, index) => {
//   //           const sessionId = String(session.sessionId || session._id);
//   //           const isSelected = String(selectedSessionId) === sessionId;
//   //           const isLoading = isSelected && isLoadingSession;
//   //           const photoCount = getPhotoCount(session);
//   //           const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

//   //           const cachedSession = sessionDataCache.current.get(sessionId);
//   //           const displayRemark = session.remark || cachedSession?.remark || null;

//   //           return (
//   //             <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//   //               <Card
//   //                 onClick={() => handleSessionSelect(sessionId)}
//   //                 sx={{
//   //                   cursor: "pointer",
//   //                   border: isSelected ? `1.5px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//   //                   bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//   //                   transition: "all 0.2s ease",
//   //                   "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02), transform: "translateY(-1px)", boxShadow: 1 },
//   //                 }}
//   //               >
//   //                 <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
//   //                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
//   //                     <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#2196F3", fontSize: "0.7rem", fontWeight: "bold" }}>
//   //                       {isLoading ? <CircularProgress size={16} /> : index + 1}
//   //                     </Box>
//   //                     <Box sx={{ flex: 1 }}>
//   //                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem" }}>
//   //                         {displayRemark || `Session #${index + 1}`}
//   //                       </Typography>
//   //                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem", display: "flex", alignItems: "center", gap: 0.5 }}>
//   //                         <ScheduleIcon sx={{ fontSize: 9 }} />
//   //                         {fmtDateTime(session.startTime || session.stats?.startTime)}
//   //                       </Typography>
//   //                     </Box>
//   //                     {photoCount > 0 && (
//   //                       <Chip icon={<PhotoIcon sx={{ fontSize: 11 }} />} label={photoCount} size="small" sx={{ height: 20, fontSize: "0.55rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
//   //                     )}
//   //                   </Box>

//   //                   <Grid container spacing={0.75} sx={{ mb: 0.75 }}>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//   //                         <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Duration</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtDuration(stats.duration)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//   //                         <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Distance</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtDist(stats.distance)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                   </Grid>

//   //                   <Divider sx={{ my: 0.75 }} />

//   //                   <Grid container spacing={0.75}>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//   //                         <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Start</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.55rem", display: "block" }}>{fmtTime(stats.startTime)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                     <Grid item xs={6}>
//   //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//   //                         <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//   //                         <Box>
//   //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>End</Typography>
//   //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.55rem", display: "block" }}>{fmtTime(stats.endTime)}</Typography>
//   //                         </Box>
//   //                       </Box>
//   //                     </Grid>
//   //                   </Grid>
//   //                 </CardContent>
//   //               </Card>
//   //             </Zoom>
//   //           );
//   //         })}
//   //       </Stack>
//   //     </Box>
//   //   </Paper>
//   // );
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0, bgcolor: "transparent" }}>
//       <Box sx={{ p: 0.75 }}>
//         {/* Stylish Header */}
//         <Box sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 1.5,
//           pb: 0.75,
//           borderBottom: `2px solid ${alpha("#2196F3", 0.2)}`,
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
//             <Box sx={{
//               width: 28,
//               height: 28,
//               borderRadius: "50%",
//               background: `linear-gradient(135deg, #2196F3, #1976D2)`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: `0 2px 8px ${alpha("#2196F3", 0.3)}`
//             }}>
//               <PinDropIcon sx={{ fontSize: 14, color: "white" }} />
//             </Box>
//             <Typography variant="subtitle2" fontWeight={700} sx={{
//               fontSize: "0.7rem",
//               background: `linear-gradient(135deg, #2196F3, #1976D2)`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               color: "transparent",
//               letterSpacing: "0.5px"
//             }}>
//               SESSIONS
//             </Typography>
//             <Chip
//               label={allSessions.length}
//               size="small"
//               sx={{
//                 height: 18,
//                 fontSize: "0.55rem",
//                 fontWeight: 700,
//                 bgcolor: alpha("#2196F3", 0.15),
//                 color: "#2196F3",
//                 borderRadius: "8px"
//               }}
//             />
//           </Box>
//           {(selectedDate || metadata?.selectedDate) && (
//             <Chip
//               label={selectedDate || metadata?.selectedDate}
//               size="small"
//               sx={{
//                 height: 20,
//                 fontSize: "0.5rem",
//                 fontWeight: 500,
//                 bgcolor: alpha("#2196F3", 0.1),
//                 color: "#2196F3",
//                 borderRadius: "6px",
//                 border: `1px solid ${alpha("#2196F3", 0.2)}`
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={1}>
//           {[...allSessions].reverse().map((session, index) => {
//             const sessionId = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading = isSelected && isLoadingSession;
//             const photoCount = getPhotoCount(session);
//             const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

//             const cachedSession = sessionDataCache.current.get(sessionId);
//             const displayRemark = session.remark || cachedSession?.remark || null;

//             return (
//               <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                 <Card
//                   onClick={() => handleSessionSelect(sessionId)}
//                   sx={{
//                     cursor: "pointer",
//                     position: "relative",
//                     overflow: "visible",
//                     background: isSelected
//                       ? `linear-gradient(135deg, ${alpha("#2196F3", 0.08)}, ${alpha("#1976D2", 0.04)})`
//                       : "rgba(255, 255, 255, 0.6)",
//                     backdropFilter: "blur(10px)",
//                     border: isSelected
//                       ? `1.5px solid ${alpha("#2196F3", 0.5)}`
//                       : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
//                     borderRadius: "12px",
//                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                     "&:hover": {
//                       borderColor: alpha("#2196F3", 0.6),
//                       background: `linear-gradient(135deg, ${alpha("#2196F3", 0.05)}, ${alpha("#1976D2", 0.02)})`,
//                       transform: "translateY(-2px) translateX(2px)",
//                       boxShadow: `0 4px 12px ${alpha("#2196F3", 0.15)}`,
//                     },
//                     ...(isSelected && {
//                       "&::before": {
//                         content: '""',
//                         position: "absolute",
//                         left: 0,
//                         top: "20%",
//                         height: "60%",
//                         width: "3px",
//                         background: `linear-gradient(135deg, #2196F3, #1976D2)`,
//                         borderRadius: "0 4px 4px 0",
//                       }
//                     })
//                   }}
//                 >
//                   <CardContent sx={{ p: 0.85, '&:last-child': { pb: 0.85 } }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, mb: 0.6 }}>
//                       {/* Stylish Number Badge */}
//                       <Box sx={{
//                         width: 26,
//                         height: 26,
//                         borderRadius: "10px",
//                         background: isSelected
//                           ? `linear-gradient(135deg, #2196F3, #1976D2)`
//                           : `linear-gradient(135deg, ${alpha("#2196F3", 0.15)}, ${alpha("#1976D2", 0.08)})`,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         boxShadow: isSelected ? `0 2px 6px ${alpha("#2196F3", 0.3)}` : "none",
//                         transition: "all 0.2s ease"
//                       }}>
//                         {isLoading ? (
//                           <CircularProgress size={14} sx={{ color: isSelected ? "white" : "#2196F3" }} />
//                         ) : (
//                           <Typography fontWeight={700} sx={{
//                             fontSize: "0.65rem",
//                             color: isSelected ? "white" : "#2196F3",
//                             textShadow: isSelected ? "0 1px 2px rgba(0,0,0,0.1)" : "none"
//                           }}>
//                             {index + 1}
//                           </Typography>
//                         )}
//                       </Box>

//                       <Box sx={{ flex: 1 }}>
//                         <Typography fontWeight={700} sx={{
//                           fontSize: "0.7rem",
//                           color: isSelected ? "#2196F3" : "text.primary",
//                           letterSpacing: "0.3px",
//                           mb: 0.25
//                         }}>
//                           {displayRemark || `Session #${index + 1}`}
//                         </Typography>
//                         {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                         <ScheduleIcon sx={{ fontSize: 8, color: alpha("#2196F3", 0.6) }} />
//                         <Typography variant="caption" sx={{ 
//                           fontSize: "0.5rem", 
//                           color: "text.secondary",
//                           fontWeight: 500
//                         }}>
//                           {fmtDateTime(session.startTime || session.stats?.startTime)}
//                         </Typography>
//                       </Box> */}
//                       </Box>

//                       {photoCount > 0 && (
//                         <Box sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 0.25,
//                           bgcolor: alpha("#FF9800", 0.1),
//                           borderRadius: "12px",
//                           px: 0.65,
//                           py: 0.3,
//                           border: `1px solid ${alpha("#FF9800", 0.2)}`
//                         }}>
//                           <PhotoIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                           <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#FF9800" }}>
//                             {photoCount}
//                           </Typography>
//                         </Box>
//                       )}
//                     </Box>

//                     {/* Stats Cards */}
//                     <Grid container spacing={0.6} sx={{ mb: 0.6 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 0.6,
//                           p: 0.5,
//                           bgcolor: alpha("#FF9800", 0.04),
//                           borderRadius: "8px",
//                           border: `1px solid ${alpha("#FF9800", 0.08)}`,
//                           transition: "all 0.2s ease",
//                           "&:hover": {
//                             bgcolor: alpha("#FF9800", 0.08),
//                             borderColor: alpha("#FF9800", 0.15)
//                           }
//                         }}>
//                           <Box sx={{
//                             width: 24,
//                             height: 24,
//                             borderRadius: "6px",
//                             bgcolor: alpha("#FF9800", 0.1),
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center"
//                           }}>
//                             <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                           </Box>
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                               Duration
//                             </Typography>
//                             <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#FF9800" }}>
//                               {fmtDuration(stats.duration)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 0.6,
//                           p: 0.5,
//                           bgcolor: alpha("#2196F3", 0.04),
//                           borderRadius: "8px",
//                           border: `1px solid ${alpha("#2196F3", 0.08)}`,
//                           transition: "all 0.2s ease",
//                           "&:hover": {
//                             bgcolor: alpha("#2196F3", 0.08),
//                             borderColor: alpha("#2196F3", 0.15)
//                           }
//                         }}>
//                           <Box sx={{
//                             width: 24,
//                             height: 24,
//                             borderRadius: "6px",
//                             bgcolor: alpha("#2196F3", 0.1),
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center"
//                           }}>
//                             <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                           </Box>
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                               Distance
//                             </Typography>
//                             <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#2196F3" }}>
//                               {fmtDist(stats.distance)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     <Divider sx={{
//                       my: 0.6,
//                       borderColor: alpha(theme.palette.divider, 0.3),
//                       background: `linear-gradient(90deg, transparent, ${alpha("#2196F3", 0.2)}, transparent)`
//                     }} />

//                     {/* Start/End Points */}
//                     <Grid container spacing={0.6}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                           <Box sx={{
//                             width: 20,
//                             height: 20,
//                             borderRadius: "6px",
//                             bgcolor: alpha("#22c55e", 0.1),
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center"
//                           }}>
//                             <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                           </Box>
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>
//                               START
//                             </Typography>
//                             <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#22c55e" }}>
//                               {fmtTime(stats.startTime)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                           <Box sx={{
//                             width: 20,
//                             height: 20,
//                             borderRadius: "6px",
//                             bgcolor: alpha("#ef4444", 0.1),
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center"
//                           }}>
//                             <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                           </Box>
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>
//                               END
//                             </Typography>
//                             <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#ef4444" }}>
//                               {fmtTime(stats.endTime)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     {/* Selected Session Indicator */}
//                     {isSelected && (
//                       <Box sx={{
//                         position: "absolute",
//                         bottom: 8,
//                         right: 8,
//                         width: 6,
//                         height: 6,
//                         borderRadius: "50%",
//                         bgcolor: "#2196F3",
//                         boxShadow: `0 0 0 2px ${alpha("#2196F3", 0.2)}`
//                       }} />
//                     )}
//                   </CardContent>
//                 </Card>
//               </Zoom>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Paper>
//   );
//   const selectedSessionListItem = allSessions.find(
//     (session) => String(session.sessionId || session._id) === String(selectedSessionId)
//   );
//   const selectedSessionCachedData = selectedSessionId
//     ? sessionDataCache.current.get(String(selectedSessionId))
//     : null;
//   const selectedSessionRemark =
//     selectedSession?.remark ||
//     selectedSessionListItem?.remark ||
//     selectedSessionCachedData?.remark ||
//     null;
//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper", overflow: "hidden" }}>
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
//           <IconButton onClick={() => setIsDarkMode(!isDarkMode)} sx={{ color: "#2196F3", mr: 1, bgcolor: alpha("#2196F3", 0.1) }}>
//             {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
//           </IconButton>
//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0, height: "calc(100vh - 48px)", overflow: "hidden" }}>
//         <Grid container sx={{ height: "100%" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "100%", backgroundColor: "#f0f0f0" }} />

//             {isLoadingSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 50, p: { xs: 0.75, sm: 1 }, borderRadius: 2, maxWidth: { xs: 180, sm: 220 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255, 255, 255, 0.3)" }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.65rem", sm: "0.7rem" }, mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <PinDropIcon sx={{ fontSize: 12 }} />
//                   {selectedSessionRemark || "No remark added"}
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 0.75, mb: 0.5 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 10, color: "#2196F3" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>
//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e", fontSize: "0.55rem" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444", fontSize: "0.55rem" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}

//             {renderPhotoCarousel()}
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
//           <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
//             <MenuIcon />
//           </Fab>
//           <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
//             <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
//                 {(selectedDate || metadata?.selectedDate) && (
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>{selectedDate || metadata?.selectedDate}</Typography>
//                 )}
//               </Box>
//               <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 56px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}

//       {renderPhotoModal()}
//     </Box>
//   );
// };

// export default Locations;


















/////// Google Map API With Inbuilt date function


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
//   Modal,
//   Fade,
//   Popover,
//   Tooltip,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   DarkMode as DarkModeIcon,
//   LightMode as LightModeIcon,
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
//   NavigateBefore as NavigateBeforeIcon,
//   NavigateNext as NavigateNextIcon,
//   CalendarToday as CalendarIcon,
//   MyLocation as MyLocationIcon,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material";
// import { getSessionDetails, getUserAvailableDates, getUserSessionsByDate } from "../redux/slices/userSlice";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
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
//   if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [], remark: null };

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
//     remark: session.remark || null,
//   };
// };

// // ─── Marker factories ──────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makeEndIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makePhotoIcon = (photoUrl, time, size = 28) =>
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

// const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
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

// const makeEndWithPhotoIcon = (photoUrl, time, size = 34) =>
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

// const makeMovingIcon = (color, time, photoUrl = null, size = 32) => {
//   const hasPhoto = !!photoUrl;
//   const innerHtml = hasPhoto
//     ? `<img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>`
//     : `<span style="font-size:${size / 2}px;">📍</span>`;

//   return L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${hasPhoto ? 'white' : color};border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;border:3px solid ${color};box-shadow:0 0 15px ${color};z-index:2;animation: marker-pulse 2s infinite;overflow:hidden;">
//         ${innerHtml}
//       </div>
//       <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid ${color};z-index:1;font-weight:700;letter-spacing:0.5px;box-shadow:0 2px 4px rgba(0,0,0,0.3);">
//         ${time} MOVING...
//       </div>
//       <style>
//         @keyframes marker-pulse {
//           0% { transform: scale(1); box-shadow: 0 0 0 0px ${color}80; }
//           70% { transform: scale(1.15); box-shadow: 0 0 0 18px ${color}00; }
//           100% { transform: scale(1); box-shadow: 0 0 0 0px ${color}00; }
//         }
//       </style>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 28],
//     iconAnchor: [size / 2, size + 15],
//   });
// };

// const isSameLatLng = (lat1, lng1, lat2, lng2) =>
//   Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

// const checkIsActive = (session) => {
//   if (!session) return false;
//   return session.isActive === true || session.isActive === "true" || session.isActive === 1 || session.isActive === "1";
// };

// // ─── Main Component ────────────────────────────────────────────────────────────
// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const {
//     sessions: initialSessions = [],
//     selectedSessionId: initialSelectedSessionId,
//     selectedDate: initialSelectedDate,
//     summary = {},
//     metadata = {},
//   } = location.state || {};

//   const sessionDetails = useSelector((state) => state.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);
//   const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
//   const userSessionsByDate = useSelector((state) => state.user?.userSessionsList || []);

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
//   const [activeDrawer, setActiveDrawer] = useState(null);
//   const [sessionPhotos, setSessionPhotos] = useState([]);
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
//   const [photoModalOpen, setPhotoModalOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(initialSelectedDate ? new Date(initialSelectedDate) : new Date());
//   const [selectedDateSessions, setSelectedDateSessions] = useState([]);
//   const [loadingSessionsByDate, setLoadingSessionsByDate] = useState(false);
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

//   // ✅ NEW: Live refresh states
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [lastRefreshed, setLastRefreshed] = useState(null);
//   const [refreshSpinning, setRefreshSpinning] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const markerRefs = useRef(new Map());
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());
//   const isInitialLoad = useRef(true);
//   const lastFitBoundsSessionId = useRef(null);
//   // ✅ flag: fly to live end-point after next refresh redraws
//   const flyToLiveAfterRefresh = useRef(false);

//   const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
//   const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);
//   const drawerOpen = activeDrawer === "sessions";
//   const drawerPaperSx = {
//     width: { xs: "85%", sm: 300 },
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16,
//   };

//   // ✅ Derived: is the currently-selected session live?
//   const isSelectedSessionActive = checkIsActive(selectedSession);

//   // Format date for backend
//   const formatBackendDate = (date) => {
//     return date.getFullYear() + "-" +
//       (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
//       date.getDate().toString().padStart(2, "0");
//   };

//   const isDateAvailable = (date) => {
//     const dateStr = formatBackendDate(date);
//     return availableDates.includes(dateStr);
//   };

//   // Fetch sessions for selected date
//   const fetchSessionsForDate = useCallback(async (date) => {
//     const userId = metadata?.userId || metadata?.trackId;
//     if (!userId) return;
//     setLoadingSessionsByDate(true);
//     const formattedDate = formatBackendDate(date);
//     await dispatch(getUserSessionsByDate({ userId, date: formattedDate, limit: 50 }));
//     setLoadingSessionsByDate(false);
//   }, [dispatch, metadata?.userId, metadata?.trackId]);

//   // ✅ NEW: Refresh live session data
//   const handleRefreshLiveLocation = useCallback(async () => {
//     if (!selectedSessionId || isRefreshing) return;
//     const userId = metadata?.userId || metadata?.trackId;
//     if (!userId) return;

//     setIsRefreshing(true);
//     setRefreshSpinning(true);
//     // ✅ Tell processSessionData to fly to the live point once redrawn
//     flyToLiveAfterRefresh.current = true;

//     try {
//       // Remove from cache so fresh data is fetched
//       sessionDataCache.current.delete(String(selectedSessionId));
//       fetchedSessions.current.delete(String(selectedSessionId));

//       // Re-fetch session details
//       await dispatch(getSessionDetails({ userId, sessionId: String(selectedSessionId) }));

//       setLastRefreshed(new Date());
//     } catch (err) {
//       console.error("Refresh failed:", err);
//     } finally {
//       setIsRefreshing(false);
//       // Keep spin animation a bit longer for visual feedback
//       setTimeout(() => setRefreshSpinning(false), 600);
//     }
//   }, [selectedSessionId, isRefreshing, metadata, dispatch]);

//   // Update sessions when userSessionsByDate changes
//   useEffect(() => {
//     if (userSessionsByDate && userSessionsByDate.length > 0) {
//       const formattedSessions = userSessionsByDate.map((session) => ({
//         _id: session._id,
//         sessionId: session.sessionId,
//         startTime: session.startTime,
//         endTime: session.endTime,
//         totalDistance: session.totalDistance,
//         isActive: session.isActive,
//         totalUploadedPhotos: session.totalUploadedPhotos,
//         remark: session.remark,
//         duration: session.startTime && session.endTime
//           ? (new Date(session.endTime) - new Date(session.startTime)) / 1000
//           : 0,
//         hasFullData: false,
//       }));
//       setSelectedDateSessions(formattedSessions);
//       setAllSessions(formattedSessions);
//     } else {
//       setSelectedDateSessions([]);
//       setAllSessions([]);
//     }
//   }, [userSessionsByDate]);

//   // Initial fetch of available dates
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     if (userId) {
//       dispatch(getUserAvailableDates({ id: userId }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId]);

//   // Fetch sessions when selected date changes
//   useEffect(() => {
//     if (selectedDate) {
//       fetchSessionsForDate(selectedDate);
//     }
//   }, [selectedDate, fetchSessionsForDate]);

//   // const getStartEndFromPhotos = useCallback((session) => {
//   //   if (!session) return { startPoint: null, endPoint: null };
//   //   const stats = getSessionStats(session);
//   //   const locs = getValidLocations(stats.locations);
//   //   const photos = (session.photos || []).filter(
//   //     (p) => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location)
//   //   );
//   //   const sortedPhotos = photos.length > 0
//   //     ? [...photos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
//   //     : [];

//   //   let sp = locs.length > 0 ? {
//   //     lat: getLat(locs[0]),
//   //     lng: getLng(locs[0]),
//   //     timestamp: locs[0].timestamp || locs[0].time || locs[0].createdAt,
//   //     address: getAddress(locs[0]),
//   //   } : null;

//   //   let ep = locs.length > 1 ? {
//   //     lat: getLat(locs[locs.length - 1]),
//   //     lng: getLng(locs[locs.length - 1]),
//   //     timestamp: locs[locs.length - 1].timestamp || locs[locs.length - 1].time || locs[locs.length - 1].createdAt,
//   //     address: getAddress(locs[locs.length - 1]),
//   //   } : (locs.length === 1 ? { ...sp } : null);

//   //   if (sortedPhotos.length > 0) {
//   //     const firstPhoto = sortedPhotos[0];
//   //     const lastPhoto = sortedPhotos[sortedPhotos.length - 1];

//   //     if (!sp || new Date(firstPhoto.timestamp) <= new Date(sp.timestamp)) {
//   //       sp = { lat: getLat(firstPhoto.location), lng: getLng(firstPhoto.location), timestamp: firstPhoto.timestamp, address: firstPhoto.address, photo: firstPhoto.url };
//   //     } else {
//   //       if (isSameLatLng(getLat(firstPhoto.location), getLng(firstPhoto.location), sp.lat, sp.lng)) {
//   //         sp.photo = firstPhoto.url;
//   //       }
//   //     }

//   //     if (checkIsActive(session)) {
//   //       if (ep) {
//   //         if (new Date(lastPhoto.timestamp) >= new Date(ep.timestamp)) ep.photo = lastPhoto.url;
//   //       } else if (lastPhoto) {
//   //         ep = { lat: getLat(lastPhoto.location), lng: getLng(lastPhoto.location), timestamp: lastPhoto.timestamp, address: lastPhoto.address, photo: lastPhoto.url };
//   //       }
//   //     } else {
//   //       if (!ep || new Date(lastPhoto.timestamp) >= new Date(ep.timestamp)) {
//   //         ep = { lat: getLat(lastPhoto.location), lng: getLng(lastPhoto.location), timestamp: lastPhoto.timestamp, address: lastPhoto.address, photo: lastPhoto.url };
//   //       }
//   //     }
//   //   }

//   //   return { startPoint: sp, endPoint: ep };
//   // }, []);


//   const getStartEndFromPhotos = useCallback((session) => {
//   if (!session) return { startPoint: null, endPoint: null };
//   const stats = getSessionStats(session);
//   const locs = getValidLocations(stats.locations);
//   const photos = (session.photos || []).filter(
//     (p) => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location)
//   );
//   const sortedPhotos = photos.length > 0
//     ? [...photos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
//     : [];

//   // Start with location-based start point (fallback)
//   let sp = locs.length > 0 ? {
//     lat: getLat(locs[0]),
//     lng: getLng(locs[0]),
//     timestamp: locs[0].timestamp || locs[0].time || locs[0].createdAt,
//     address: getAddress(locs[0]),
//   } : null;

//   let ep = locs.length > 1 ? {
//     lat: getLat(locs[locs.length - 1]),
//     lng: getLng(locs[locs.length - 1]),
//     timestamp: locs[locs.length - 1].timestamp || locs[locs.length - 1].time || locs[locs.length - 1].createdAt,
//     address: getAddress(locs[locs.length - 1]),
//   } : (locs.length === 1 ? { ...sp } : null);

//   if (sortedPhotos.length > 0) {
//     const firstPhoto = sortedPhotos[0];  // 0th index photo
//     const lastPhoto = sortedPhotos[sortedPhotos.length - 1];

//     // ✅ ALWAYS use the first photo as the start point (0th index)
//     // Override sp with first photo's location
//     sp = { 
//       lat: getLat(firstPhoto.location), 
//       lng: getLng(firstPhoto.location), 
//       timestamp: firstPhoto.timestamp, 
//       address: firstPhoto.address || getAddress(firstPhoto.location), 
//       photo: firstPhoto.url 
//     };

//     // Handle end point based on session status
//     if (checkIsActive(session)) {
//       // For active sessions: use last photo for end point if available
//       if (lastPhoto) {
//         ep = { 
//           lat: getLat(lastPhoto.location), 
//           lng: getLng(lastPhoto.location), 
//           timestamp: lastPhoto.timestamp, 
//           address: lastPhoto.address || getAddress(lastPhoto.location), 
//           photo: lastPhoto.url 
//         };
//       }
//     } else {
//       // For completed sessions: use last photo as end point
//       if (lastPhoto) {
//         ep = { 
//           lat: getLat(lastPhoto.location), 
//           lng: getLng(lastPhoto.location), 
//           timestamp: lastPhoto.timestamp, 
//           address: lastPhoto.address || getAddress(lastPhoto.location), 
//           photo: lastPhoto.url 
//         };
//       }
//     }
//   }

//   return { startPoint: sp, endPoint: ep };
// }, []);
//   const buildSessionPhotos = useCallback((session) => {
//     if (!session) return [];
//     const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
//     const result = [];
//     const seenUrls = new Set();
//     const seenLatLng = new Set();
//     const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

//     if (sp && sp.photo && !seenUrls.has(sp.photo)) {
//       const latLngKey = getLatLngKey(sp.lat, sp.lng);
//       if (!seenLatLng.has(latLngKey)) {
//         seenUrls.add(sp.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "start", url: sp.photo, timestamp: sp.timestamp, address: sp.address, lat: sp.lat, lng: sp.lng, type: "start" });
//       }
//     }

//     const rawPhotos = session.photos || [];
//     rawPhotos.forEach((photo, idx) => {
//       if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//       if (seenUrls.has(photo.url)) return;
//       const pLat = getLat(photo.location);
//       const pLng = getLng(photo.location);
//       const latLngKey = getLatLngKey(pLat, pLng);
//       if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
//       if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
//       if (seenLatLng.has(latLngKey)) return;
//       seenUrls.add(photo.url);
//       seenLatLng.add(latLngKey);
//       result.push({ key: `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type: "route" });
//     });

//     if (ep && ep.photo && !seenUrls.has(ep.photo)) {
//       const latLngKey = getLatLngKey(ep.lat, ep.lng);
//       if (!(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng)) && !seenLatLng.has(latLngKey)) {
//         seenUrls.add(ep.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "end", url: ep.photo, timestamp: ep.timestamp, address: ep.address, lat: ep.lat, lng: ep.lng, type: "end" });
//       }
//     }
//     return result;
//   }, [getStartEndFromPhotos]);

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

//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);
//       if (selectedSessionId === id && selectedSession) return;

//       setSelectedSessionId(id);
//       setIsLoadingSession(true);
//       // ✅ Reset last-refreshed when switching sessions
//       setLastRefreshed(null);

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

//       if (isMobile) setActiveDrawer("sessions");
//     },
//     [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
//   );

//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       const id = String(sessionDetails.sessionId);
//       const stats = getSessionStats(sessionDetails);
//       const originalSession = userSessionsByDate.find(s => String(s.sessionId || s._id) === id);
//       const sessionWithStats = {
//         ...originalSession,
//         ...sessionDetails,
//         ...stats,
//         isActive: sessionDetails.isActive !== undefined ? sessionDetails.isActive : originalSession?.isActive,
//       };

//       sessionDataCache.current.set(id, sessionWithStats);

//       setSessionStatsMap((prev) => {
//         const newMap = new Map(prev);
//         newMap.set(id, stats);
//         return newMap;
//       });

//       setAllSessions((prev) =>
//         prev.map((s) =>
//           String(s.sessionId || s._id) === id
//             ? { ...s, remark: sessionDetails.remark || s.remark }
//             : s
//         )
//       );

//       processSessionData(sessionWithStats);
//     }
//   }, [sessionDetails, selectedSessionId, userSessionsByDate, processSessionData]);

//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       let targetId = null;

//       if (isInitialLoad.current && initialSelectedSessionId) {
//         const idStr = String(initialSelectedSessionId);
//         const exists = allSessions.some(s => String(s.sessionId || s._id) === idStr);
//         if (exists) targetId = idStr;
//       }

//       if (!targetId) {
//         const topSession = allSessions[allSessions.length - 1];
//         targetId = String(topSession.sessionId || topSession._id);
//       }

//       handleSessionSelect(targetId);
//       isInitialLoad.current = false;
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   useEffect(() => {
//     if (selectedSession) {
//       const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(selectedSession);
//       setStartPoint(sp);
//       setEndPoint(ep);
//       setSessionPhotos(buildSessionPhotos(selectedSession));
//     }
//   }, [selectedSession, getStartEndFromPhotos, buildSessionPhotos]);

//   // ── Map helpers ────────────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//     markerRefs.current.clear();
//   };

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

//     if (startPoint && hasValidCoordinates(startPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;font-family:inherit;">
//         <div style="background:linear-gradient(135deg, #22c55e, #15803d);color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b style="font-size:13px;letter-spacing:0.5px">START POINT</b></div>
//         </div>
//         <div style="padding:4px 0;">
//           <div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
//           <div style="font-size:12px;color:#666;margin-bottom:4px;"><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
//           ${startPoint.photo ? `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:8px;"><img src="${startPoint.photo}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.1);" onclick="window.open('${startPoint.photo}','_blank')"/></div>` : ""}
//         </div>
//       </div>`;
//       const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34);
//       const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 260, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     } else if (validLocations.length > 0) {
//       const fb = validLocations[0];
//       const popupContent = `<div style="min-width:160px;max-width:200px;"><div style="background:#22c55e;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;"><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🚀</span><b style="font-size:11px">START POINT</b></div></div><div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div><div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div></div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     }

//     const isActive = checkIsActive(session);
//     if (endPoint && hasValidCoordinates(endPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;font-family:inherit;">
//         <div style="background:linear-gradient(135deg, ${isActive ? "#2196F3, #1976D2" : "#ef4444, #dc2626"});color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">${isActive ? "📍" : "🏁"}</span><b style="font-size:13px;letter-spacing:0.5px">${isActive ? "LIVE LOCATION" : "END POINT"}</b></div>
//         </div>
//         <div style="padding:4px 0;">
//           <div style="font-size:12px;color:#666;margin-bottom:2px;"><b>${isActive ? "Last Update" : "Time"}:</b> ${fmtTime(endPoint.timestamp)}</div>
//           <div style="font-size:12px;color:#666;margin-bottom:4px;"><b>Address:</b> ${endPoint.address || "Fetching address..."}</div>
//           ${endPoint.photo ? `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:8px;"><img src="${endPoint.photo}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.1);" onclick="window.open('${endPoint.photo}','_blank')"/></div>` : ""}
//         </div>
//       </div>`;
//       const icon = isActive
//         ? makeMovingIcon("#2196F3", fmtTime(endPoint.timestamp), endPoint.photo, 32)
//         : (endPoint.photo ? makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 34) : makeEndIcon("#ef4444", fmtTime(endPoint.timestamp), false, 28));
//       const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 260, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     } else if (validLocations.length > 1) {
//       const lastLoc = validLocations[validLocations.length - 1];
//       const popupContent = `<div style="min-width:160px;max-width:200px;"><div style="background:${isActive ? "#2196F3" : "#ef4444"};color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;"><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">${isActive ? "📍" : "🏁"}</span><b style="font-size:11px">${isActive ? "LIVE LOCATION" : "END POINT"}</b></div></div><div style="font-size:10px"><b>Time:</b> ${fmtTime(lastLoc.timestamp)}</div><div style="font-size:10px"><b>Address:</b> ${getAddress(lastLoc)}</div></div>`;
//       const icon = isActive
//         ? makeMovingIcon("#2196F3", fmtTime(lastLoc.timestamp), null, 30)
//         : makeEndIcon("#ef4444", fmtTime(lastLoc.timestamp), false, 28);
//       const m = L.marker([getLat(lastLoc), getLng(lastLoc)], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     }

//     if (showPhotos && session.photos && session.photos.length > 0) {
//       session.photos.forEach((photo, idx) => {
//         if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//         const lat = photo.location.lat || photo.location.latitude;
//         const lng = photo.location.lng || photo.location.longitude;
//         if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
//         if (endPoint && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;
//         const popup = `<div style="min-width:180px;max-width:240px;font-family:inherit;"><div style="background:linear-gradient(135deg, #FF9800, #F57C00);color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;"><b style="font-size:13px;letter-spacing:0.5px">📸 ROUTE PHOTO</b></div><div style="padding:4px 0;"><div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Time:</b> ${fmtTime(photo.timestamp)}</div><div style="font-size:12px;color:#666;margin-bottom:6px;"><b>Remark:</b> ${photo.remark || "No remark"}</div><div style="margin-top:6px;"><img src="${photo.url}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.1);" onclick="window.open('${photo.url}','_blank')"/></div></div></div>`;
//         const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28), zIndexOffset: 950 })
//           .bindPopup(popup, { maxWidth: 260, minWidth: 180 }).addTo(mapInstance.current);
//         markers.current.push(m);
//         markerRefs.current.set(`photo_${idx}`, m);
//       });
//     }

//     // ✅ After a live-refresh, fly directly to the latest (end/moving) point
//     if (flyToLiveAfterRefresh.current && checkIsActive(session)) {
//       flyToLiveAfterRefresh.current = false; // consume flag

//       // Prefer the resolved endPoint, fall back to last valid GPS fix
//       const liveEp = endPoint && hasValidCoordinates(endPoint)
//         ? endPoint
//         : validLocations.length > 0
//           ? { lat: getLat(validLocations[validLocations.length - 1]), lng: getLng(validLocations[validLocations.length - 1]) }
//           : null;

//       if (liveEp) {
//         mapInstance.current.flyTo([liveEp.lat, liveEp.lng], 17, { animate: true, duration: 1.2 });
//         return; // skip the normal fitBounds so we don't fight the fly
//       }
//     }

//     // Normal first-load fitBounds (not a refresh)
//     if (validLocations.length > 0 && lastFitBoundsSessionId.current !== String(session.sessionId || session._id)) {
//       const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//       lastFitBoundsSessionId.current = String(session.sessionId || session._id);
//     }
//   }, [startPoint, endPoint, showPhotoMarkers]);

//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;
//     const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });

//     const apiKey = import.meta.env.VITE_GOOGLE_MAP_APIKEY;
//     const googleRoadmap = L.tileLayer(`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Maps", maxZoom: 19 });
//     const googleSatellite = L.tileLayer(`https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Satellite", maxZoom: 19 });
//     const googleHybrid = L.tileLayer(`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Hybrid", maxZoom: 19 });
//     const googleTerrain = L.tileLayer(`https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Terrain", maxZoom: 19 });

//     const baseMaps = { "Roadmap": googleRoadmap, "Satellite": googleSatellite, "Hybrid": googleHybrid, "Terrain": googleTerrain };
//     googleRoadmap.addTo(map);
//     L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);

//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   useEffect(() => {
//     if (mapInstance.current && selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
//     };
//   }, []);

//   useEffect(() => {
//     const tilePane = document.querySelector(".leaflet-tile-pane");
//     if (tilePane) {
//       tilePane.style.filter = isDarkMode ? "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none";
//       tilePane.style.transition = "filter 0.3s ease";
//     }
//   }, [isDarkMode, isMapInitialized]);

//   const getPhotoCount = (session) => session?.photos?.length || 0;

//   const handlePhotoClick = (photo) => {
//     if (!mapInstance.current) return;
//     const markerKey = photo.key;
//     if (markerRefs.current.has(markerKey)) {
//       const m = markerRefs.current.get(markerKey);
//       const latLng = m.getLatLng();
//       mapInstance.current.setView(latLng, 18, { animate: true, duration: 1.5 });
//       setTimeout(() => m.openPopup(), 1500);
//       return;
//     }
//     if (photo.lat && photo.lng) {
//       mapInstance.current.setView([photo.lat, photo.lng], 18, { animate: true, duration: 1.5 });
//     }
//   };

//   const handleDateSelection = (date) => {
//     setSelectedDate(date);
//     setShowCalendar(false);
//     setCalendarAnchorEl(null);
//     setSelectedSessionId(null);
//     setSelectedSession(null);
//     setHasLocations(false);
//     setLastRefreshed(null);
//     clearMap();
//   };

//   const toggleCalendar = (event) => {
//     setCalendarAnchorEl(event.currentTarget);
//     setShowCalendar(!showCalendar);
//   };

//   const closeCalendar = () => {
//     setShowCalendar(false);
//     setCalendarAnchorEl(null);
//   };

//   // ─── Photo Carousel ────────────────────────────────────────────────────────
//   const renderPhotoCarousel = () => {
//     if (!selectedSession || sessionPhotos.length === 0) return null;
//     return (
//       <Paper elevation={3} sx={{ position: "absolute", bottom: 20, left: 16, right: 16, zIndex: 600, bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", borderRadius: 2, p: 0.5, overflow: "hidden" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, px: 0.5 }}>
//           <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//           <Typography variant="caption" sx={{ color: "white", fontWeight: 500, fontSize: "10px" }}>
//             Session Photos ({sessionPhotos.length})
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", gap: 0.75, overflowX: "auto", overflowY: "hidden", pb: 0.5, "&::-webkit-scrollbar": { height: 3 }, "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2 } }}>
//           {sessionPhotos.map((photo, index) => {
//             const isStart = photo.type === "start";
//             const isEnd = photo.type === "end";
//             const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";
//             return (
//               <Box key={photo.key || index} onClick={() => handlePhotoClick(photo)} sx={{ flexShrink: 0, width: 60, height: 60, borderRadius: 1, overflow: "hidden", cursor: "pointer", border: `1.5px solid ${borderColor}`, position: "relative", transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }}>
//                 <img src={photo.url} alt={`Photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
//                   {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
//                 </Box>
//                 <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.6)", color: "white", fontSize: "7px", textAlign: "center", py: 0.15 }}>
//                   {fmtTime(photo.timestamp)}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Paper>
//     );
//   };

//   // ─── Photo Modal ───────────────────────────────────────────────────────────
//   const renderPhotoModal = () => {
//     if (!photoModalOpen || selectedPhotoIndex === null) return null;
//     const currentPhoto = sessionPhotos[selectedPhotoIndex];
//     const handleNext = () => setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
//     const handlePrev = () => setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
//     return (
//       <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} closeAfterTransition sx={{ zIndex: 1300 }}>
//         <Fade in={photoModalOpen}>
//           <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 800, bgcolor: "black", borderRadius: 2, boxShadow: 24, overflow: "hidden" }}>
//             <Box sx={{ position: "relative" }}>
//               <IconButton onClick={() => setPhotoModalOpen(false)} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}><CloseIcon /></IconButton>
//               <img src={currentPhoto?.url} alt="Full size" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
//               <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}><NavigateBeforeIcon /></IconButton>
//               <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}><NavigateNextIcon /></IconButton>
//             </Box>
//             <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
//               <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
//                 {currentPhoto?.type === "start" ? "🚀 Start Point" : currentPhoto?.type === "end" ? "🏁 End Point" : `📸 Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`}
//               </Typography>
//               <Typography variant="caption" display="block" color="text.secondary">{fmtDateTime(currentPhoto?.timestamp)}</Typography>
//               <Typography variant="caption" display="block" color="text.secondary">📍 {currentPhoto?.address || "Address not available"}</Typography>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     );
//   };

//   // ─── Session List ─────────────────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0, bgcolor: "transparent" }}>
//       <Box sx={{ p: 0.75 }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, pb: 0.75, borderBottom: `2px solid ${alpha("#2196F3", 0.2)}` }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
//             <Box sx={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #2196F3, #1976D2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${alpha("#2196F3", 0.3)}` }}>
//               <PinDropIcon sx={{ fontSize: 14, color: "white" }} />
//             </Box>
//             <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: "0.7rem", background: "linear-gradient(135deg, #2196F3, #1976D2)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", letterSpacing: "0.5px" }}>
//               SESSIONS
//             </Typography>
//             <Chip label={allSessions.length} size="small" sx={{ height: 18, fontSize: "0.55rem", fontWeight: 700, bgcolor: alpha("#2196F3", 0.15), color: "#2196F3", borderRadius: "8px" }} />
//           </Box>

//           <Button variant="outlined" size="small" onClick={toggleCalendar} startIcon={<CalendarIcon sx={{ fontSize: 14 }} />} sx={{ borderColor: alpha("#2196F3", 0.3), color: "#2196F3", fontSize: "0.6rem", py: 0.3, px: 1, borderRadius: "16px", textTransform: "none", "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.05) } }}>
//             {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
//           </Button>

//           <Popover open={showCalendar} anchorEl={calendarAnchorEl} onClose={closeCalendar} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} PaperProps={{ sx: { borderRadius: 2, boxShadow: `0 4px 20px ${alpha("#000", 0.15)}`, p: 1 } }}>
//             <style>{`
//               .compact-calendar { border: none !important; font-family: inherit !important; }
//               .compact-calendar .react-calendar__tile { padding: 8px 4px !important; line-height: 1.2 !important; font-size: 0.7rem !important; position: relative; border-radius: 8px !important; }
//               .compact-calendar .react-calendar__navigation button { min-width: 28px !important; height: 28px !important; font-size: 0.72rem !important; padding: 0 !important; border-radius: 6px !important; }
//               .compact-calendar .react-calendar__navigation { height: 28px !important; margin-bottom: 8px !important; }
//               .compact-calendar .react-calendar__month-view__weekdays { font-size: 0.62rem !important; text-transform: uppercase; font-weight: 600; }
//               .compact-calendar .react-calendar__month-view__weekdays__weekday { padding: 4px !important; }
//               .available-date { background-color: ${alpha("#2196F3", 0.15)} !important; border-radius: 8px !important; font-weight: bold !important; }
//               .available-date:hover { background-color: ${alpha("#2196F3", 0.25)} !important; }
//               .available-dot { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background-color: #2196F3; }
//               .react-calendar__tile--active { background: linear-gradient(135deg, #2196F3, #1976D2) !important; color: white !important; }
//               .react-calendar__tile--now { background: ${alpha("#2196F3", 0.1)} !important; }
//             `}</style>
//             <Calendar onChange={handleDateSelection} value={selectedDate} maxDate={new Date()} next2Label={null} prev2Label={null} className="compact-calendar"
//               tileClassName={({ date, view }) => view === "month" && isDateAvailable(date) ? "available-date" : null}
//               tileContent={({ date, view }) => view === "month" && isDateAvailable(date) ? <div className="available-dot" /> : null}
//             />
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 1, pt: 1, borderTop: `1px solid ${alpha("#2196F3", 0.1)}` }}>
//               <Button size="small" onClick={closeCalendar} sx={{ fontSize: "0.65rem", color: "#2196F3" }}>Close</Button>
//             </Box>
//           </Popover>
//         </Box>

//         {/* Loading */}
//         {loadingSessionsByDate && (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//             <CircularProgress size={30} sx={{ color: "#2196F3" }} />
//           </Box>
//         )}

//         {/* Empty */}
//         {!loadingSessionsByDate && allSessions.length === 0 && (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <CalendarIcon sx={{ fontSize: 40, color: alpha("#2196F3", 0.3), mb: 1 }} />
//             <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>No sessions found for this date</Typography>
//           </Box>
//         )}

//         {/* Sessions */}
//         {!loadingSessionsByDate && allSessions.length > 0 && (
//           <Stack spacing={1}>
//             {[...allSessions].reverse().map((session, index) => {
//               const sessionId = String(session.sessionId || session._id);
//               const isSelected = String(selectedSessionId) === sessionId;
//               const isLoading = isSelected && isLoadingSession;
//               const photoCount = getPhotoCount(session);
//               const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);
//               const cachedSession = sessionDataCache.current.get(sessionId);
//               const displayRemark = session.remark || cachedSession?.remark || null;
//               const sessionIsActive = checkIsActive(session);

//               return (
//                 <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                   <Card
//                     onClick={() => handleSessionSelect(sessionId)}
//                     sx={{
//                       cursor: "pointer",
//                       position: "relative",
//                       overflow: "visible",
//                       background: isSelected
//                         ? `linear-gradient(135deg, ${alpha("#2196F3", 0.08)}, ${alpha("#1976D2", 0.04)})`
//                         : "rgba(255, 255, 255, 0.6)",
//                       backdropFilter: "blur(10px)",
//                       border: isSelected
//                         ? `1.5px solid ${alpha("#2196F3", 0.5)}`
//                         : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
//                       borderRadius: "12px",
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       "&:hover": { borderColor: alpha("#2196F3", 0.6), background: `linear-gradient(135deg, ${alpha("#2196F3", 0.05)}, ${alpha("#1976D2", 0.02)})`, transform: "translateY(-2px) translateX(2px)", boxShadow: `0 4px 12px ${alpha("#2196F3", 0.15)}` },
//                       ...(isSelected && { "&::before": { content: '""', position: "absolute", left: 0, top: "20%", height: "60%", width: "3px", background: "linear-gradient(135deg, #2196F3, #1976D2)", borderRadius: "0 4px 4px 0" } }),
//                     }}
//                   >
//                     <CardContent sx={{ p: 0.85, "&:last-child": { pb: 0.85 } }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, mb: 0.6 }}>
//                         <Box sx={{ width: 26, height: 26, borderRadius: "10px", background: isSelected ? "linear-gradient(135deg, #2196F3, #1976D2)" : `linear-gradient(135deg, ${alpha("#2196F3", 0.15)}, ${alpha("#1976D2", 0.08)})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isSelected ? `0 2px 6px ${alpha("#2196F3", 0.3)}` : "none", transition: "all 0.2s ease" }}>
//                           {isLoading ? (
//                             <CircularProgress size={14} sx={{ color: isSelected ? "white" : "#2196F3" }} />
//                           ) : (
//                             <Typography fontWeight={700} sx={{ fontSize: "0.65rem", color: isSelected ? "white" : "#2196F3" }}>
//                               {index + 1}
//                             </Typography>
//                           )}
//                         </Box>

//                         <Box sx={{ flex: 1 }}>
//                           <Typography fontWeight={700} sx={{ fontSize: "0.7rem", color: isSelected ? "#2196F3" : "text.primary", letterSpacing: "0.3px", mb: 0.25 }}>
//                             {displayRemark || `Session #${index + 1}`}
//                           </Typography>
//                         </Box>

//                         {/* ✅ LIVE badge — shown only when isActive */}
//                         {sessionIsActive && (
//                           <Box sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 0.3,
//                             bgcolor: alpha("#22c55e", 0.12),
//                             border: `1px solid ${alpha("#22c55e", 0.35)}`,
//                             borderRadius: "10px",
//                             px: 0.6,
//                             py: 0.25,
//                           }}>
//                             <Box sx={{
//                               width: 5,
//                               height: 5,
//                               borderRadius: "50%",
//                               bgcolor: "#22c55e",
//                               animation: "livePulse 1.4s ease-in-out infinite",
//                               "@keyframes livePulse": {
//                                 "0%, 100%": { opacity: 1, transform: "scale(1)" },
//                                 "50%": { opacity: 0.4, transform: "scale(0.7)" },
//                               },
//                             }} />
//                             <Typography sx={{ fontSize: "0.5rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.4px" }}>
//                               LIVE
//                             </Typography>
//                           </Box>
//                         )}

//                         {photoCount > 0 && (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, bgcolor: alpha("#FF9800", 0.1), borderRadius: "12px", px: 0.65, py: 0.3, border: `1px solid ${alpha("#FF9800", 0.2)}` }}>
//                             <PhotoIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                             <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#FF9800" }}>{photoCount}</Typography>
//                           </Box>
//                         )}
//                       </Box>

//                       <Grid container spacing={0.6} sx={{ mb: 0.6 }}>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, p: 0.5, bgcolor: alpha("#FF9800", 0.04), borderRadius: "8px", border: `1px solid ${alpha("#FF9800", 0.08)}` }}>
//                             <Box sx={{ width: 24, height: 24, borderRadius: "6px", bgcolor: alpha("#FF9800", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Duration</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#FF9800" }}>{fmtDuration(stats.duration)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, p: 0.5, bgcolor: alpha("#2196F3", 0.04), borderRadius: "8px", border: `1px solid ${alpha("#2196F3", 0.08)}` }}>
//                             <Box sx={{ width: 24, height: 24, borderRadius: "6px", bgcolor: alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Distance</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#2196F3" }}>{fmtDist(stats.distance)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                       </Grid>

//                       <Divider sx={{ my: 0.6, borderColor: alpha(theme.palette.divider, 0.3), background: `linear-gradient(90deg, transparent, ${alpha("#2196F3", 0.2)}, transparent)` }} />

//                       <Grid container spacing={0.6}>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                             <Box sx={{ width: 20, height: 20, borderRadius: "6px", bgcolor: alpha("#22c55e", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>START</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#22c55e" }}>{fmtTime(stats.startTime)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                             <Box sx={{ width: 20, height: 20, borderRadius: "6px", bgcolor: alpha("#ef4444", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>END</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#ef4444" }}>{fmtTime(stats.endTime)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                       </Grid>

//                       {isSelected && (
//                         <Box sx={{ position: "absolute", bottom: 8, right: 8, width: 6, height: 6, borderRadius: "50%", bgcolor: "#2196F3", boxShadow: `0 0 0 2px ${alpha("#2196F3", 0.2)}` }} />
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Zoom>
//               );
//             })}
//           </Stack>
//         )}
//       </Box>
//     </Paper>
//   );

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper", overflow: "hidden" }}>
//       <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
//             <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//           </IconButton>
//           <Box sx={{ flex: 1, ml: 1 }}>
//             <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#2196F3", fontWeight: 600 }}>
//               {selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//             </Typography>
//           </Box>
//           <IconButton onClick={() => setIsDarkMode(!isDarkMode)} sx={{ color: "#2196F3", mr: 1, bgcolor: alpha("#2196F3", 0.1) }}>
//             {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
//           </IconButton>
//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0, height: "calc(100vh - 56px)", overflow: "hidden" }}>
//         <Grid container sx={{ height: "100%" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "100%", backgroundColor: "#f0f0f0" }} />

//             {isLoadingSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {/* ── Stats overlay ── */}
//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 50, p: { xs: 0.75, sm: 1 }, borderRadius: 2, maxWidth: { xs: 180, sm: 220 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255, 255, 255, 0.3)" }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.65rem", sm: "0.7rem" }, mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <PinDropIcon sx={{ fontSize: 12 }} />
//                   {selectedSession.remark || "Session"}
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 0.75, mb: 0.5 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 10, color: "#2196F3" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>
//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e", fontSize: "0.55rem" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444", fontSize: "0.55rem" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}

//             {/* ✅ LIVE REFRESH BUTTON — only visible when selected session isActive */}
//             {isSelectedSessionActive && (
//               <Zoom in={isSelectedSessionActive}>
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: sessionPhotos.length > 0 ? 150 : 20,
//                     top: "auto",
//                     right: 16,
//                     zIndex: 600,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-end",
//                     gap: 0.5,
//                   }}
//                 >
//                   <Tooltip title={lastRefreshed ? `Last updated: ${lastRefreshed.toLocaleTimeString()}` : "Refresh live location"} placement="left">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         bgcolor: "rgba(255,255,255,0.92)",
//                         backdropFilter: "blur(10px)",
//                         borderRadius: "24px",
//                         px: 1.5,
//                         py: 0.75,
//                         boxShadow: `0 4px 16px ${alpha("#22c55e", 0.35)}`,
//                         border: `1.5px solid ${alpha("#22c55e", 0.4)}`,
//                         cursor: isRefreshing ? "not-allowed" : "pointer",
//                         transition: "all 0.2s ease",
//                         "&:hover": !isRefreshing ? {
//                           bgcolor: "rgba(255,255,255,1)",
//                           boxShadow: `0 6px 20px ${alpha("#22c55e", 0.5)}`,
//                           transform: "translateY(-1px)",
//                         } : {},
//                       }}
//                       onClick={handleRefreshLiveLocation}
//                     >
//                       {/* Pulsing live dot */}
//                       <Box sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: "50%",
//                         bgcolor: "#22c55e",
//                         flexShrink: 0,
//                         animation: "liveDot 1.4s ease-in-out infinite",
//                         "@keyframes liveDot": {
//                           "0%, 100%": { opacity: 1, transform: "scale(1)" },
//                           "50%": { opacity: 0.35, transform: "scale(0.65)" },
//                         },
//                       }} />

//                       <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#15803d", letterSpacing: "0.3px", userSelect: "none" }}>
//                         LIVE
//                       </Typography>

//                       {/* Refresh icon — spins while refreshing */}
//                       <Box sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 22,
//                         height: 22,
//                         borderRadius: "50%",
//                         bgcolor: alpha("#22c55e", 0.12),
//                         flexShrink: 0,
//                         transition: "background 0.2s",
//                         "&:hover": { bgcolor: alpha("#22c55e", 0.2) },
//                       }}>
//                         {isRefreshing ? (
//                           <CircularProgress size={13} sx={{ color: "#22c55e" }} />
//                         ) : (
//                           <RefreshIcon sx={{
//                             fontSize: 14,
//                             color: "#22c55e",
//                             transition: "transform 0.6s ease",
//                             transform: refreshSpinning ? "rotate(360deg)" : "rotate(0deg)",
//                           }} />
//                         )}
//                       </Box>
//                     </Box>
//                   </Tooltip>

//                   {/* Last refreshed timestamp */}
//                   {lastRefreshed && (
//                     <Typography sx={{
//                       fontSize: "0.52rem",
//                       color: alpha("#15803d", 0.8),
//                       bgcolor: "rgba(255,255,255,0.85)",
//                       backdropFilter: "blur(6px)",
//                       borderRadius: "10px",
//                       px: 1,
//                       py: 0.2,
//                       border: `1px solid ${alpha("#22c55e", 0.2)}`,
//                     }}>
//                       Updated {lastRefreshed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
//                     </Typography>
//                   )}
//                 </Box>
//               </Zoom>
//             )}

//             {renderPhotoCarousel()}
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
//           <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
//             <MenuIcon />
//           </Fab>
//           <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
//             <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>
//                   {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//                 </Typography>
//               </Box>
//               <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 56px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}

//       {renderPhotoModal()}
//     </Box>
//   );
// };

// export default Locations;























// Show Google Tringle Moving Pin


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
//   Modal,
//   Fade,
//   Popover,
//   Tooltip,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   DarkMode as DarkModeIcon,
//   LightMode as LightModeIcon,
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
//   NavigateBefore as NavigateBeforeIcon,
//   NavigateNext as NavigateNextIcon,
//   CalendarToday as CalendarIcon,
//   MyLocation as MyLocationIcon,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material";
// import { getSessionDetails, getUserAvailableDates, getUserSessionsByDate } from "../redux/slices/userSlice";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet default icons
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
//   if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [], remark: null };

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
//     remark: session.remark || null,
//   };
// };

// const isSameLatLng = (lat1, lng1, lat2, lng2) =>
//   Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

// const checkIsActive = (session) => {
//   if (!session) return false;
//   return session.isActive === true || session.isActive === "true" || session.isActive === 1 || session.isActive === "1";
// };

// // ─── Marker factories ──────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makeEndIcon = (color, time, hasPhoto = false, size = 28) =>
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

// const makePhotoIcon = (photoUrl, time, size = 28) =>
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

// const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
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

// const makeEndWithPhotoIcon = (photoUrl, time, size = 34) =>
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

// // ─── makeMovingIcon ────────────────────────────────────────────────────────────
// const makeMovingIcon = (color = "#2196F3", time, size = 24) =>
//   L.divIcon({
//     html: `
//       <div style="position:relative;width:${size}px;height:${size}px;display:flex;flex-direction:column;align-items:center;">

//         <!-- Ring 1 – closest, fastest -->
//         <div style="
//           position:absolute;
//           top:0;left:0;
//           width:${size}px;height:${size}px;
//           border-radius:50%;
//           background:${color}25;
//           animation:liveRing1 1.6s ease-out infinite;
//           pointer-events:none;
//         "></div>

//         <!-- Ring 2 – mid -->
//         <div style="
//           position:absolute;
//           top:-4px;left:-4px;
//           width:${size + 8}px;height:${size + 8}px;
//           border-radius:50%;
//           background:${color}18;
//           animation:liveRing2 1.6s ease-out infinite 0.4s;
//           pointer-events:none;
//         "></div>

//         <!-- Ring 3 – outermost, slowest -->
//         <div style="
//           position:absolute;
//           top:-8px;left:-8px;
//           width:${size + 16}px;height:${size + 16}px;
//           border-radius:50%;
//           background:${color}10;
//           animation:liveRing3 1.6s ease-out infinite 0.8s;
//           pointer-events:none;
//         "></div>

//         <!-- Core dot -->
//         <div style="
//           position:absolute;
//           top:0;left:0;
//           width:${size}px;height:${size}px;
//           border-radius:50%;
//           background:${color};
//           border:2.5px solid #fff;
//           box-shadow:0 1px 5px rgba(0,0,0,0.28);
//           animation:liveCore 1.2s ease-in-out infinite;
//           z-index:2;
//         "></div>

//         <!-- Inner white dot (static, no animation) -->
//         <div style="
//           position:absolute;
//           top:50%;left:50%;
//           transform:translate(-50%,-50%);
//           width:${Math.round(size / 3)}px;height:${Math.round(size / 3)}px;
//           border-radius:50%;
//           background:#fff;
//           opacity:0.9;
//           z-index:3;
//           pointer-events:none;
//         "></div>

//         <!-- Time label -->
//         <div style="
//           position:absolute;
//           bottom:-22px;
//           left:50%;
//           transform:translateX(-50%);
//           background:rgba(0,0,0,0.82);
//           color:#fff;
//           padding:2px 8px;
//           border-radius:12px;
//           font-size:7px;
//           white-space:nowrap;
//           border:1px solid ${color};
//           font-weight:600;
//           letter-spacing:0.3px;
//           z-index:4;
//           pointer-events:none;
//         ">📍 ${time}</div>

//         <style>
//           @keyframes liveRing1 {
//             0%   { transform: scale(1);   opacity: 0.6; }
//             100% { transform: scale(2.4); opacity: 0;   }
//           }
//           @keyframes liveRing2 {
//             0%   { transform: scale(1);   opacity: 0.4; }
//             100% { transform: scale(2.9); opacity: 0;   }
//           }
//           @keyframes liveRing3 {
//             0%   { transform: scale(1);    opacity: 0.25; }
//             100% { transform: scale(3.6);  opacity: 0;    }
//           }
//           @keyframes liveCore {
//             0%, 100% { transform: scale(1);    }
//             50%       { transform: scale(0.87); }
//           }
//         </style>
//       </div>
//     `,
//     className: "",
//     iconSize: [size, size + 30],
//     iconAnchor: [size / 2, size / 2 + 3],
//   });

// // ─── Main Component ────────────────────────────────────────────────────────────
// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const {
//     sessions: initialSessions = [],
//     selectedSessionId: initialSelectedSessionId,
//     selectedDate: initialSelectedDate,
//     summary = {},
//     metadata = {},
//   } = location.state || {};

//   const sessionDetails = useSelector((state) => state.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);
//   const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
//   const userSessionsByDate = useSelector((state) => state.user?.userSessionsList || []);

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
//   const [activeDrawer, setActiveDrawer] = useState(null);
//   const [sessionPhotos, setSessionPhotos] = useState([]);
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
//   const [photoModalOpen, setPhotoModalOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(initialSelectedDate ? new Date(initialSelectedDate) : new Date());
//   const [selectedDateSessions, setSelectedDateSessions] = useState([]);
//   const [loadingSessionsByDate, setLoadingSessionsByDate] = useState(false);

//   // Live refresh states
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [lastRefreshed, setLastRefreshed] = useState(null);
//   const [refreshSpinning, setRefreshSpinning] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const markerRefs = useRef(new Map());
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());
//   const isInitialLoad = useRef(true);
//   const lastFitBoundsSessionId = useRef(null);
//   const flyToLiveAfterRefresh = useRef(false);

//   const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
//   const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);
//   const drawerOpen = activeDrawer === "sessions";
//   const drawerPaperSx = {
//     width: { xs: "85%", sm: 300 },
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16,
//   };

//   // Derived: is the currently-selected session live?
//   const isSelectedSessionActive = checkIsActive(selectedSession);

//   // Format date for backend
//   const formatBackendDate = (date) => {
//     return date.getFullYear() + "-" +
//       (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
//       date.getDate().toString().padStart(2, "0");
//   };

//   const isDateAvailable = (date) => {
//     const dateStr = formatBackendDate(date);
//     return availableDates.includes(dateStr);
//   };

//   // Fetch sessions for selected date
//   const fetchSessionsForDate = useCallback(async (date) => {
//     const userId = metadata?.userId || metadata?.trackId;
//     if (!userId) return;
//     setLoadingSessionsByDate(true);
//     const formattedDate = formatBackendDate(date);
//     await dispatch(getUserSessionsByDate({ userId, date: formattedDate, limit: 50 }));
//     setLoadingSessionsByDate(false);
//   }, [dispatch, metadata?.userId, metadata?.trackId]);

//   // Refresh live session data
//   const handleRefreshLiveLocation = useCallback(async () => {
//     if (!selectedSessionId || isRefreshing) return;
//     const userId = metadata?.userId || metadata?.trackId;
//     if (!userId) return;

//     setIsRefreshing(true);
//     setRefreshSpinning(true);
//     flyToLiveAfterRefresh.current = true;

//     try {
//       sessionDataCache.current.delete(String(selectedSessionId));
//       fetchedSessions.current.delete(String(selectedSessionId));

//       await dispatch(getSessionDetails({ userId, sessionId: String(selectedSessionId) }));
//       setLastRefreshed(new Date());
//     } catch (err) {
//       console.error("Refresh failed:", err);
//     } finally {
//       setIsRefreshing(false);
//       setTimeout(() => setRefreshSpinning(false), 600);
//     }
//   }, [selectedSessionId, isRefreshing, metadata, dispatch]);

//   // Update sessions when userSessionsByDate changes
//   useEffect(() => {
//     if (userSessionsByDate && userSessionsByDate.length > 0) {
//       const formattedSessions = userSessionsByDate.map((session) => ({
//         _id: session._id,
//         sessionId: session.sessionId,
//         startTime: session.startTime,
//         endTime: session.endTime,
//         totalDistance: session.totalDistance,
//         isActive: session.isActive,
//         totalUploadedPhotos: session.totalUploadedPhotos,
//         remark: session.remark,
//         duration: session.startTime && session.endTime
//           ? (new Date(session.endTime) - new Date(session.startTime)) / 1000
//           : 0,
//         hasFullData: false,
//       }));
//       setSelectedDateSessions(formattedSessions);
//       setAllSessions(formattedSessions);
//     } else {
//       setSelectedDateSessions([]);
//       setAllSessions([]);
//     }
//   }, [userSessionsByDate]);

//   // Initial fetch of available dates
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     if (userId) {
//       dispatch(getUserAvailableDates({ id: userId }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId]);

//   // Fetch sessions when selected date changes
//   useEffect(() => {
//     if (selectedDate) {
//       fetchSessionsForDate(selectedDate);
//     }
//   }, [selectedDate, fetchSessionsForDate]);

//   const getStartEndFromPhotos = useCallback((session) => {
//     if (!session) return { startPoint: null, endPoint: null };
//     const stats = getSessionStats(session);
//     const locs = getValidLocations(stats.locations);
//     const photos = (session.photos || []).filter(
//       (p) => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location)
//     );
//     const sortedPhotos = photos.length > 0
//       ? [...photos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
//       : [];

//     let sp = locs.length > 0 ? {
//       lat: getLat(locs[0]),
//       lng: getLng(locs[0]),
//       timestamp: locs[0].timestamp || locs[0].time || locs[0].createdAt,
//       address: getAddress(locs[0]),
//     } : null;

//     let ep = locs.length > 1 ? {
//       lat: getLat(locs[locs.length - 1]),
//       lng: getLng(locs[locs.length - 1]),
//       timestamp: locs[locs.length - 1].timestamp || locs[locs.length - 1].time || locs[locs.length - 1].createdAt,
//       address: getAddress(locs[locs.length - 1]),
//     } : (locs.length === 1 ? { ...sp } : null);

//     if (sortedPhotos.length > 0) {
//       const firstPhoto = sortedPhotos[0];
//       const lastPhoto = sortedPhotos[sortedPhotos.length - 1];

//       sp = {
//         lat: getLat(firstPhoto.location),
//         lng: getLng(firstPhoto.location),
//         timestamp: firstPhoto.timestamp,
//         address: firstPhoto.address || getAddress(firstPhoto.location),
//         photo: firstPhoto.url,
//       };

//       if (lastPhoto) {
//         ep = {
//           lat: getLat(lastPhoto.location),
//           lng: getLng(lastPhoto.location),
//           timestamp: lastPhoto.timestamp,
//           address: lastPhoto.address || getAddress(lastPhoto.location),
//           photo: lastPhoto.url,
//         };
//       }
//     }

//     return { startPoint: sp, endPoint: ep };
//   }, []);

//   // ─── buildSessionPhotos ────────────────────────────────────────────────────
//   // For LIVE sessions: push every photo that has a valid URL, sorted by time.
//   //   No location-dedup, no start/end filtering — the user must see ALL photos.
//   // For COMPLETED sessions: original dedup logic preserved exactly.
//   const buildSessionPhotos = useCallback((session) => {
//     if (!session) return [];
//     const isActive = checkIsActive(session);
//     const rawPhotos = session.photos || [];

//     // ── LIVE SESSION: show every photo, sorted by timestamp ──────────────────
//     if (isActive) {
//       const validPhotos = rawPhotos
//         .filter((p) => hasValidPhoto(p))
//         .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

//       return validPhotos.map((photo, idx) => {
//         const pLat = photo.location && hasValidCoordinates(photo.location) ? getLat(photo.location) : null;
//         const pLng = photo.location && hasValidCoordinates(photo.location) ? getLng(photo.location) : null;
//         // Label first photo as "start", last as "end", rest as "route"
//         const type = idx === 0 ? "start" : idx === validPhotos.length - 1 ? "end" : "route";
//         return {
//           key: type === "start" ? "start" : type === "end" ? "end" : `photo_${idx}`,
//           idx,
//           url: photo.url,
//           timestamp: photo.timestamp,
//           address: photo.address || "Address not available",
//           lat: pLat,
//           lng: pLng,
//           type,
//         };
//       });
//     }

//     // ── COMPLETED SESSION: original dedup logic ──────────────────────────────
//     const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
//     const result = [];
//     const seenUrls = new Set();
//     const seenLatLng = new Set();
//     const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

//     if (sp && sp.photo && !seenUrls.has(sp.photo)) {
//       const latLngKey = getLatLngKey(sp.lat, sp.lng);
//       if (!seenLatLng.has(latLngKey)) {
//         seenUrls.add(sp.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "start", url: sp.photo, timestamp: sp.timestamp, address: sp.address, lat: sp.lat, lng: sp.lng, type: "start" });
//       }
//     }

//     rawPhotos.forEach((photo, idx) => {
//       if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//       if (seenUrls.has(photo.url)) return;
//       const pLat = getLat(photo.location);
//       const pLng = getLng(photo.location);
//       const latLngKey = getLatLngKey(pLat, pLng);
//       if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
//       if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
//       if (seenLatLng.has(latLngKey)) return;
//       seenUrls.add(photo.url);
//       seenLatLng.add(latLngKey);
//       result.push({ key: `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type: "route" });
//     });

//     if (ep && ep.photo && !seenUrls.has(ep.photo)) {
//       const latLngKey = getLatLngKey(ep.lat, ep.lng);
//       const notSameAsStart = !(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng));
//       if (notSameAsStart && !seenLatLng.has(latLngKey)) {
//         seenUrls.add(ep.photo);
//         seenLatLng.add(latLngKey);
//         result.push({ key: "end", url: ep.photo, timestamp: ep.timestamp, address: ep.address, lat: ep.lat, lng: ep.lng, type: "end" });
//       }
//     }
//     return result;
//   }, [getStartEndFromPhotos]);

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

//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);
//       if (selectedSessionId === id && selectedSession) return;

//       setSelectedSessionId(id);
//       setIsLoadingSession(true);
//       setLastRefreshed(null);

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

//       if (isMobile) setActiveDrawer("sessions");
//     },
//     [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
//   );

//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       const id = String(sessionDetails.sessionId);
//       const stats = getSessionStats(sessionDetails);
//       const originalSession = userSessionsByDate.find(s => String(s.sessionId || s._id) === id);
//       const sessionWithStats = {
//         ...originalSession,
//         ...sessionDetails,
//         ...stats,
//         isActive: sessionDetails.isActive !== undefined ? sessionDetails.isActive : originalSession?.isActive,
//       };

//       sessionDataCache.current.set(id, sessionWithStats);

//       setSessionStatsMap((prev) => {
//         const newMap = new Map(prev);
//         newMap.set(id, stats);
//         return newMap;
//       });

//       setAllSessions((prev) =>
//         prev.map((s) =>
//           String(s.sessionId || s._id) === id
//             ? { ...s, remark: sessionDetails.remark || s.remark }
//             : s
//         )
//       );

//       processSessionData(sessionWithStats);
//     }
//   }, [sessionDetails, selectedSessionId, userSessionsByDate, processSessionData]);

//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       let targetId = null;

//       if (isInitialLoad.current && initialSelectedSessionId) {
//         const idStr = String(initialSelectedSessionId);
//         const exists = allSessions.some(s => String(s.sessionId || s._id) === idStr);
//         if (exists) targetId = idStr;
//       }

//       if (!targetId) {
//         const topSession = allSessions[allSessions.length - 1];
//         targetId = String(topSession.sessionId || topSession._id);
//       }

//       handleSessionSelect(targetId);
//       isInitialLoad.current = false;
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   useEffect(() => {
//     if (selectedSession) {
//       const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(selectedSession);
//       setStartPoint(sp);
//       setEndPoint(ep);
//       setSessionPhotos(buildSessionPhotos(selectedSession));
//     }
//   }, [selectedSession, getStartEndFromPhotos, buildSessionPhotos]);

//   // ── Map helpers ────────────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//     markerRefs.current.clear();
//   };

//   const drawMapWithSession = useCallback((session, showPhotos) => {
//     if (!mapInstance.current) return;
//     const stats = getSessionStats(session);
//     const allLocations = stats.locations || [];
//     if (!allLocations.length) return;

//     clearMap();
//     const validLocations = getValidLocations(allLocations);
//     if (validLocations.length === 0) return;

//     // Draw route polyline
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

//     // ── START marker ──────────────────────────────────────────────────────────
//     if (startPoint && hasValidCoordinates(startPoint)) {
//       const popupContent = `<div style="min-width:180px;max-width:240px;font-family:inherit;">
//         <div style="background:linear-gradient(135deg, #22c55e, #15803d);color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b style="font-size:13px;letter-spacing:0.5px">START POINT</b></div>
//         </div>
//         <div style="padding:4px 0;">
//           <div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
//           <div style="font-size:12px;color:#666;margin-bottom:4px;"><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
//           ${startPoint.photo ? `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:8px;"><img src="${startPoint.photo}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.1);" onclick="window.open('${startPoint.photo}','_blank')"/></div>` : ""}
//         </div>
//       </div>`;
//       const icon = startPoint.photo
//         ? makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34)
//         : makeStartIcon("#22c55e", fmtTime(startPoint.timestamp), false, 28);
//       const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 260, minWidth: 180 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     } else if (validLocations.length > 0) {
//       const fb = validLocations[0];
//       const popupContent = `<div style="min-width:160px;max-width:200px;"><div style="background:#22c55e;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;"><b style="font-size:11px">🚀 START POINT</b></div><div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div><div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div></div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
//         .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     }

//     const isActive = checkIsActive(session);

//     // ── LIVE SESSION: animated dot on most-recent location (online OR offline) ─
//     if (isActive && validLocations.length > 0) {
//       const mostRecentLocation = validLocations[validLocations.length - 1];
//       const ts = mostRecentLocation.timestamp || mostRecentLocation.time || mostRecentLocation.createdAt;
//       const isOnline = mostRecentLocation.isOnline === true;

//       const popupContent = `
//         <div style="min-width:180px;max-width:240px;font-family:inherit;">
//           <div style="background:linear-gradient(135deg,${isOnline ? '#2196F3' : '#6c757d'},${isOnline ? '#1976D2' : '#5a6268'});color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;">
//             <div style="display:flex;align-items:center;gap:6px;">
//               <span style="font-size:16px">${isOnline ? '📍' : '📶'}</span>
//               <b style="font-size:13px;letter-spacing:0.5px">${isOnline ? 'LIVE LOCATION' : 'LAST KNOWN LOCATION (OFFLINE)'}</b>
//             </div>
//           </div>
//           <div style="padding:4px 0;">
//             <div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Last Update:</b> ${fmtTime(ts)}</div>
//             <div style="font-size:12px;color:#666;"><b>Status:</b> ${isOnline ? '🟢 Online' : '⚫ Offline'}</div>
//             <div style="font-size:12px;color:#666;margin-top:4px;"><b>Address:</b> ${getAddress(mostRecentLocation)}</div>
//           </div>
//         </div>`;

//       const markerColor = isOnline ? "#2196F3" : "#6c757d";
//       const m = L.marker(
//         [getLat(mostRecentLocation), getLng(mostRecentLocation)],
//         { icon: makeMovingIcon(markerColor, fmtTime(ts), 24), zIndexOffset: 1100 }
//       )
//         .bindPopup(popupContent, { maxWidth: 260, minWidth: 180 })
//         .addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("live", m);

//     // ── COMPLETED SESSION: end marker ─────────────────────────────────────────
//     } else if (!isActive) {
//       if (endPoint && hasValidCoordinates(endPoint)) {
//         const popupContent = `
//           <div style="min-width:180px;max-width:240px;font-family:inherit;">
//             <div style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;">
//               <div style="display:flex;align-items:center;gap:6px;">
//                 <span style="font-size:16px">🏁</span>
//                 <b style="font-size:13px;letter-spacing:0.5px">END POINT</b>
//               </div>
//             </div>
//             <div style="padding:4px 0;">
//               <div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
//               <div style="font-size:12px;color:#666;margin-bottom:4px;"><b>Address:</b> ${endPoint.address || "Address not available"}</div>
//               ${endPoint.photo
//                 ? `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:8px;">
//                     <img src="${endPoint.photo}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;" onclick="window.open('${endPoint.photo}','_blank')"/>
//                   </div>`
//                 : ""}
//             </div>
//           </div>`;

//         const icon = endPoint.photo
//           ? makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 34)
//           : makeEndIcon("#ef4444", fmtTime(endPoint.timestamp), false, 28);

//         const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
//           .bindPopup(popupContent, { maxWidth: 260, minWidth: 180 })
//           .addTo(mapInstance.current);
//         markers.current.push(m);
//         markerRefs.current.set("end", m);

//       } else if (validLocations.length > 1) {
//         const lastLoc = validLocations[validLocations.length - 1];
//         const popupContent = `
//           <div style="min-width:160px;max-width:200px;">
//             <div style="background:#ef4444;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
//               <b style="font-size:11px">🏁 END POINT</b>
//             </div>
//             <div style="font-size:10px"><b>Time:</b> ${fmtTime(lastLoc.timestamp)}</div>
//             <div style="font-size:10px"><b>Address:</b> ${getAddress(lastLoc)}</div>
//           </div>`;

//         const m = L.marker([getLat(lastLoc), getLng(lastLoc)], {
//           icon: makeEndIcon("#ef4444", fmtTime(lastLoc.timestamp), false, 28),
//           zIndexOffset: 1000,
//         })
//           .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 })
//           .addTo(mapInstance.current);
//         markers.current.push(m);
//         markerRefs.current.set("end", m);
//       }
//     }

//     // ── Route photo markers ────────────────────────────────────────────────────
//     if (showPhotos && session.photos && session.photos.length > 0) {
//       const sortedPhotos = [...session.photos].sort(
//         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//       );
//       sortedPhotos.forEach((photo, idx) => {
//         if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//         const lat = getLat(photo.location);
//         const lng = getLng(photo.location);
//         // LIVE: show every photo marker — no start/end filtering
//         // COMPLETED: skip duplicates at start/end pins
//         if (!isActive) {
//           if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
//           if (endPoint && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;
//         }
//         const isFirst = isActive && idx === 0;
//         const isLast = isActive && idx === sortedPhotos.length - 1;
//         const markerKey = isFirst ? "start" : isLast ? "end" : `photo_${idx}`;
//         const label = isFirst ? "FIRST PHOTO" : isLast ? "LATEST PHOTO" : "ROUTE PHOTO";
//         const popup = `<div style="min-width:180px;max-width:240px;font-family:inherit;">
//           <div style="background:linear-gradient(135deg, #FF9800, #F57C00);color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;">
//             <b style="font-size:13px;letter-spacing:0.5px">📸 ${label}</b>
//           </div>
//           <div style="padding:4px 0;">
//             <div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
//             <div style="font-size:12px;color:#666;margin-bottom:6px;"><b>Remark:</b> ${photo.remark || "No remark"}</div>
//             <div style="margin-top:6px;">
//               <img src="${photo.url}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.1);" onclick="window.open('${photo.url}','_blank')"/>
//             </div>
//           </div>
//         </div>`;
//         const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28), zIndexOffset: 950 })
//           .bindPopup(popup, { maxWidth: 260, minWidth: 180 }).addTo(mapInstance.current);
//         markers.current.push(m);
//         markerRefs.current.set(markerKey, m);
//       });
//     }

//     // ── flyToLiveAfterRefresh ──────────────────────────────────────────────────
//     if (flyToLiveAfterRefresh.current && checkIsActive(session)) {
//       flyToLiveAfterRefresh.current = false;

//       const liveTarget =
//         [...validLocations].reverse().find((l) => l.isOnline === true) ??
//         (validLocations.length > 0 ? validLocations[validLocations.length - 1] : null);

//       if (liveTarget) {
//         mapInstance.current.flyTo(
//           [getLat(liveTarget), getLng(liveTarget)],
//           17,
//           { animate: true, duration: 1.0 }
//         );
//         return;
//       }
//     }

//     // ── Normal first-load fitBounds ────────────────────────────────────────────
//     if (
//       validLocations.length > 0 &&
//       lastFitBoundsSessionId.current !== String(session.sessionId || session._id)
//     ) {
//       const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//       lastFitBoundsSessionId.current = String(session.sessionId || session._id);
//     }
//   }, [startPoint, endPoint, showPhotoMarkers]);

//   // ── Map init ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;
//     const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });

//     const apiKey = import.meta.env.VITE_GOOGLE_MAP_APIKEY;
//     const googleRoadmap = L.tileLayer(`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Maps", maxZoom: 19 });
//     const googleSatellite = L.tileLayer(`https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Satellite", maxZoom: 19 });
//     const googleHybrid = L.tileLayer(`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Hybrid", maxZoom: 19 });
//     const googleTerrain = L.tileLayer(`https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Terrain", maxZoom: 19 });

//     const baseMaps = { "Roadmap": googleRoadmap, "Satellite": googleSatellite, "Hybrid": googleHybrid, "Terrain": googleTerrain };
//     googleRoadmap.addTo(map);
//     L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);

//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   useEffect(() => {
//     if (mapInstance.current && selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
//     };
//   }, []);

//   useEffect(() => {
//     const tilePane = document.querySelector(".leaflet-tile-pane");
//     if (tilePane) {
//       tilePane.style.filter = isDarkMode
//         ? "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)"
//         : "none";
//       tilePane.style.transition = "filter 0.3s ease";
//     }
//   }, [isDarkMode, isMapInitialized]);

//   const getPhotoCount = (session) => session?.photos?.length || 0;

//   // ── FIX: smooth flyTo + popup when carousel photo is clicked ─────────────────
//   const handlePhotoClick = (photo) => {
//     if (!mapInstance.current) return;

//     const flyAndOpen = (latLng, markerKey) => {
//       mapInstance.current.flyTo(latLng, 18, { animate: true, duration: 1.2 });
//       if (markerKey && markerRefs.current.has(markerKey)) {
//         const m = markerRefs.current.get(markerKey);
//         // Wait for flyTo to finish then open popup
//         mapInstance.current.once("moveend", () => {
//           m.openPopup();
//         });
//       }
//     };

//     // Try exact marker key first
//     if (markerRefs.current.has(photo.key)) {
//       const m = markerRefs.current.get(photo.key);
//       const latLng = m.getLatLng();
//       flyAndOpen(latLng, photo.key);
//       return;
//     }

//     // For "start" / "end" / "live" named keys
//     if (photo.type === "start" && markerRefs.current.has("start")) {
//       const m = markerRefs.current.get("start");
//       flyAndOpen(m.getLatLng(), "start");
//       return;
//     }
//     if (photo.type === "end") {
//       // completed sessions use "end", live sessions use "live"
//       const key = markerRefs.current.has("end") ? "end" : markerRefs.current.has("live") ? "live" : null;
//       if (key) {
//         const m = markerRefs.current.get(key);
//         flyAndOpen(m.getLatLng(), key);
//         return;
//       }
//     }

//     // Fallback: fly to photo's own lat/lng
//     if (photo.lat && photo.lng) {
//       mapInstance.current.flyTo([photo.lat, photo.lng], 18, { animate: true, duration: 1.2 });
//     }
//   };

//   const handleDateSelection = (date) => {
//     setSelectedDate(date);
//     setShowCalendar(false);
//     setCalendarAnchorEl(null);
//     setSelectedSessionId(null);
//     setSelectedSession(null);
//     setHasLocations(false);
//     setLastRefreshed(null);
//     clearMap();
//   };

//   const toggleCalendar = (event) => {
//     setCalendarAnchorEl(event.currentTarget);
//     setShowCalendar(!showCalendar);
//   };

//   const closeCalendar = () => {
//     setShowCalendar(false);
//     setCalendarAnchorEl(null);
//   };

//   // ─── Photo Carousel ────────────────────────────────────────────────────────
//   const renderPhotoCarousel = () => {
//     if (!selectedSession || sessionPhotos.length === 0) return null;
//     return (
//       <Paper elevation={3} sx={{ position: "absolute", bottom: 20, left: 16, right: 16, zIndex: 600, bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", borderRadius: 2, p: 0.5, overflow: "hidden" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, px: 0.5 }}>
//           <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//           <Typography variant="caption" sx={{ color: "white", fontWeight: 500, fontSize: "10px" }}>
//             Session Photos ({sessionPhotos.length})
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", gap: 0.75, overflowX: "auto", overflowY: "hidden", pb: 0.5, "&::-webkit-scrollbar": { height: 3 }, "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2 } }}>
//           {sessionPhotos.map((photo, index) => {
//             const isStart = photo.type === "start";
//             const isEnd = photo.type === "end";
//             const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";
//             return (
//               <Box key={photo.key || index} onClick={() => handlePhotoClick(photo)} sx={{ flexShrink: 0, width: 60, height: 60, borderRadius: 1, overflow: "hidden", cursor: "pointer", border: `1.5px solid ${borderColor}`, position: "relative", transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }}>
//                 <img src={photo.url} alt={`Photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
//                   {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
//                 </Box>
//                 <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.6)", color: "white", fontSize: "7px", textAlign: "center", py: 0.15 }}>
//                   {fmtTime(photo.timestamp)}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Paper>
//     );
//   };

//   // ─── Photo Modal ───────────────────────────────────────────────────────────
//   const renderPhotoModal = () => {
//     if (!photoModalOpen || selectedPhotoIndex === null) return null;
//     const currentPhoto = sessionPhotos[selectedPhotoIndex];
//     const handleNext = () => setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
//     const handlePrev = () => setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
//     return (
//       <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} closeAfterTransition sx={{ zIndex: 1300 }}>
//         <Fade in={photoModalOpen}>
//           <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 800, bgcolor: "black", borderRadius: 2, boxShadow: 24, overflow: "hidden" }}>
//             <Box sx={{ position: "relative" }}>
//               <IconButton onClick={() => setPhotoModalOpen(false)} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}><CloseIcon /></IconButton>
//               <img src={currentPhoto?.url} alt="Full size" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
//               <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}><NavigateBeforeIcon /></IconButton>
//               <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}><NavigateNextIcon /></IconButton>
//             </Box>
//             <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
//               <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
//                 {currentPhoto?.type === "start" ? "🚀 Start Point" : currentPhoto?.type === "end" ? "🏁 End Point" : `📸 Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`}
//               </Typography>
//               <Typography variant="caption" display="block" color="text.secondary">{fmtDateTime(currentPhoto?.timestamp)}</Typography>
//               <Typography variant="caption" display="block" color="text.secondary">📍 {currentPhoto?.address || "Address not available"}</Typography>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     );
//   };

//   // ─── Session List ─────────────────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0, bgcolor: "transparent" }}>
//       <Box sx={{ p: 0.75 }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, pb: 0.75, borderBottom: `2px solid ${alpha("#2196F3", 0.2)}` }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
//             <Box sx={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #2196F3, #1976D2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${alpha("#2196F3", 0.3)}` }}>
//               <PinDropIcon sx={{ fontSize: 14, color: "white" }} />
//             </Box>
//             <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: "0.7rem", background: "linear-gradient(135deg, #2196F3, #1976D2)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", letterSpacing: "0.5px" }}>
//               SESSIONS
//             </Typography>
//             <Chip label={allSessions.length} size="small" sx={{ height: 18, fontSize: "0.55rem", fontWeight: 700, bgcolor: alpha("#2196F3", 0.15), color: "#2196F3", borderRadius: "8px" }} />
//           </Box>

//           <Button variant="outlined" size="small" onClick={toggleCalendar} startIcon={<CalendarIcon sx={{ fontSize: 14 }} />} sx={{ borderColor: alpha("#2196F3", 0.3), color: "#2196F3", fontSize: "0.6rem", py: 0.3, px: 1, borderRadius: "16px", textTransform: "none", "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.05) } }}>
//             {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
//           </Button>

//           <Popover open={showCalendar} anchorEl={calendarAnchorEl} onClose={closeCalendar} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} PaperProps={{ sx: { borderRadius: 2, boxShadow: `0 4px 20px ${alpha("#000", 0.15)}`, p: 1 } }}>
//             <style>{`
//               .compact-calendar { border: none !important; font-family: inherit !important; }
//               .compact-calendar .react-calendar__tile { padding: 8px 4px !important; line-height: 1.2 !important; font-size: 0.7rem !important; position: relative; border-radius: 8px !important; }
//               .compact-calendar .react-calendar__navigation button { min-width: 28px !important; height: 28px !important; font-size: 0.72rem !important; padding: 0 !important; border-radius: 6px !important; }
//               .compact-calendar .react-calendar__navigation { height: 28px !important; margin-bottom: 8px !important; }
//               .compact-calendar .react-calendar__month-view__weekdays { font-size: 0.62rem !important; text-transform: uppercase; font-weight: 600; }
//               .compact-calendar .react-calendar__month-view__weekdays__weekday { padding: 4px !important; }
//               .available-date { background-color: ${alpha("#2196F3", 0.15)} !important; border-radius: 8px !important; font-weight: bold !important; }
//               .available-date:hover { background-color: ${alpha("#2196F3", 0.25)} !important; }
//               .available-dot { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background-color: #2196F3; }
//               .react-calendar__tile--active { background: linear-gradient(135deg, #2196F3, #1976D2) !important; color: white !important; }
//               .react-calendar__tile--now { background: ${alpha("#2196F3", 0.1)} !important; }
//             `}</style>
//             <Calendar
//               onChange={handleDateSelection}
//               value={selectedDate}
//               maxDate={new Date()}
//               next2Label={null}
//               prev2Label={null}
//               className="compact-calendar"
//               tileClassName={({ date, view }) => view === "month" && isDateAvailable(date) ? "available-date" : null}
//               tileContent={({ date, view }) => view === "month" && isDateAvailable(date) ? <div className="available-dot" /> : null}
//             />
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 1, pt: 1, borderTop: `1px solid ${alpha("#2196F3", 0.1)}` }}>
//               <Button size="small" onClick={closeCalendar} sx={{ fontSize: "0.65rem", color: "#2196F3" }}>Close</Button>
//             </Box>
//           </Popover>
//         </Box>

//         {/* Loading */}
//         {loadingSessionsByDate && (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//             <CircularProgress size={30} sx={{ color: "#2196F3" }} />
//           </Box>
//         )}

//         {/* Empty state */}
//         {!loadingSessionsByDate && allSessions.length === 0 && (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <CalendarIcon sx={{ fontSize: 40, color: alpha("#2196F3", 0.3), mb: 1 }} />
//             <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>No sessions found for this date</Typography>
//           </Box>
//         )}

//         {/* Sessions */}
//         {!loadingSessionsByDate && allSessions.length > 0 && (
//           <Stack spacing={1}>
//             {[...allSessions].reverse().map((session, index) => {
//               const sessionId = String(session.sessionId || session._id);
//               const isSelected = String(selectedSessionId) === sessionId;
//               const isLoading = isSelected && isLoadingSession;
//               const photoCount = getPhotoCount(session);
//               const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);
//               const cachedSession = sessionDataCache.current.get(sessionId);
//               const displayRemark = session.remark || cachedSession?.remark || null;
//               const sessionIsActive = checkIsActive(session);

//               return (
//                 <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                   <Card
//                     onClick={() => handleSessionSelect(sessionId)}
//                     sx={{
//                       cursor: "pointer",
//                       position: "relative",
//                       overflow: "visible",
//                       background: isSelected
//                         ? `linear-gradient(135deg, ${alpha("#2196F3", 0.08)}, ${alpha("#1976D2", 0.04)})`
//                         : "rgba(255, 255, 255, 0.6)",
//                       backdropFilter: "blur(10px)",
//                       border: isSelected
//                         ? `1.5px solid ${alpha("#2196F3", 0.5)}`
//                         : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
//                       borderRadius: "12px",
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       "&:hover": {
//                         borderColor: alpha("#2196F3", 0.6),
//                         background: `linear-gradient(135deg, ${alpha("#2196F3", 0.05)}, ${alpha("#1976D2", 0.02)})`,
//                         transform: "translateY(-2px) translateX(2px)",
//                         boxShadow: `0 4px 12px ${alpha("#2196F3", 0.15)}`,
//                       },
//                       ...(isSelected && {
//                         "&::before": {
//                           content: '""',
//                           position: "absolute",
//                           left: 0,
//                           top: "20%",
//                           height: "60%",
//                           width: "3px",
//                           background: "linear-gradient(135deg, #2196F3, #1976D2)",
//                           borderRadius: "0 4px 4px 0",
//                         },
//                       }),
//                     }}
//                   >
//                     <CardContent sx={{ p: 0.85, "&:last-child": { pb: 0.85 } }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, mb: 0.6 }}>
//                         <Box sx={{ width: 26, height: 26, borderRadius: "10px", background: isSelected ? "linear-gradient(135deg, #2196F3, #1976D2)" : `linear-gradient(135deg, ${alpha("#2196F3", 0.15)}, ${alpha("#1976D2", 0.08)})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isSelected ? `0 2px 6px ${alpha("#2196F3", 0.3)}` : "none", transition: "all 0.2s ease" }}>
//                           {isLoading ? (
//                             <CircularProgress size={14} sx={{ color: isSelected ? "white" : "#2196F3" }} />
//                           ) : (
//                             <Typography fontWeight={700} sx={{ fontSize: "0.65rem", color: isSelected ? "white" : "#2196F3" }}>
//                               {index + 1}
//                             </Typography>
//                           )}
//                         </Box>

//                         <Box sx={{ flex: 1 }}>
//                           <Typography fontWeight={700} sx={{ fontSize: "0.7rem", color: isSelected ? "#2196F3" : "text.primary", letterSpacing: "0.3px", mb: 0.25 }}>
//                             {displayRemark || `Session #${index + 1}`}
//                           </Typography>
//                         </Box>

//                         {/* LIVE badge */}
//                         {sessionIsActive && (
//                           <Box sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 0.3,
//                             bgcolor: alpha("#22c55e", 0.12),
//                             border: `1px solid ${alpha("#22c55e", 0.35)}`,
//                             borderRadius: "10px",
//                             px: 0.6,
//                             py: 0.25,
//                           }}>
//                             <Box sx={{
//                               width: 5,
//                               height: 5,
//                               borderRadius: "50%",
//                               bgcolor: "#22c55e",
//                               animation: "livePulse 1.4s ease-in-out infinite",
//                               "@keyframes livePulse": {
//                                 "0%, 100%": { opacity: 1, transform: "scale(1)" },
//                                 "50%": { opacity: 0.4, transform: "scale(0.7)" },
//                               },
//                             }} />
//                             <Typography sx={{ fontSize: "0.5rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.4px" }}>
//                               LIVE
//                             </Typography>
//                           </Box>
//                         )}

//                         {photoCount > 0 && (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, bgcolor: alpha("#FF9800", 0.1), borderRadius: "12px", px: 0.65, py: 0.3, border: `1px solid ${alpha("#FF9800", 0.2)}` }}>
//                             <PhotoIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                             <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#FF9800" }}>{photoCount}</Typography>
//                           </Box>
//                         )}
//                       </Box>

//                       <Grid container spacing={0.6} sx={{ mb: 0.6 }}>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, p: 0.5, bgcolor: alpha("#FF9800", 0.04), borderRadius: "8px", border: `1px solid ${alpha("#FF9800", 0.08)}` }}>
//                             <Box sx={{ width: 24, height: 24, borderRadius: "6px", bgcolor: alpha("#FF9800", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Duration</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#FF9800" }}>{fmtDuration(stats.duration)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, p: 0.5, bgcolor: alpha("#2196F3", 0.04), borderRadius: "8px", border: `1px solid ${alpha("#2196F3", 0.08)}` }}>
//                             <Box sx={{ width: 24, height: 24, borderRadius: "6px", bgcolor: alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Distance</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#2196F3" }}>{fmtDist(stats.distance)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                       </Grid>

//                       <Divider sx={{ my: 0.6, borderColor: alpha(theme.palette.divider, 0.3) }} />

//                       <Grid container spacing={0.6}>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                             <Box sx={{ width: 20, height: 20, borderRadius: "6px", bgcolor: alpha("#22c55e", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>START</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#22c55e" }}>{fmtTime(stats.startTime)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                             <Box sx={{ width: 20, height: 20, borderRadius: "6px", bgcolor: alpha("#ef4444", 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>END</Typography>
//                               <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#ef4444" }}>{fmtTime(stats.endTime)}</Typography>
//                             </Box>
//                           </Box>
//                         </Grid>
//                       </Grid>

//                       {isSelected && (
//                         <Box sx={{ position: "absolute", bottom: 8, right: 8, width: 6, height: 6, borderRadius: "50%", bgcolor: "#2196F3", boxShadow: `0 0 0 2px ${alpha("#2196F3", 0.2)}` }} />
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Zoom>
//               );
//             })}
//           </Stack>
//         )}
//       </Box>
//     </Paper>
//   );

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper", overflow: "hidden" }}>
//       <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
//             <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//           </IconButton>
//           <Box sx={{ flex: 1, ml: 1 }}>
//             <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#2196F3", fontWeight: 600 }}>
//               {selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//             </Typography>
//           </Box>
//           <IconButton onClick={() => setIsDarkMode(!isDarkMode)} sx={{ color: "#2196F3", mr: 1, bgcolor: alpha("#2196F3", 0.1) }}>
//             {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
//           </IconButton>
//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0, height: "calc(100vh - 56px)", overflow: "hidden" }}>
//         <Grid container sx={{ height: "100%" }}>
//           {/* Map area */}
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "100%", backgroundColor: "#f0f0f0" }} />

//             {isLoadingSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {/* Stats overlay */}
//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 50, p: { xs: 0.75, sm: 1 }, borderRadius: 2, maxWidth: { xs: 180, sm: 220 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255, 255, 255, 0.3)" }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.65rem", sm: "0.7rem" }, mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <PinDropIcon sx={{ fontSize: 12 }} />
//                   {selectedSession.remark || "Session"}
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 0.75, mb: 0.5 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 10, color: "#FF9800" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 10, color: "#2196F3" }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>
//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e", fontSize: "0.55rem" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444", fontSize: "0.55rem" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}

//             {/* LIVE REFRESH BUTTON */}
//             {isSelectedSessionActive && (
//               <Zoom in={isSelectedSessionActive}>
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: sessionPhotos.length > 0 ? 150 : 20,
//                     right: 16,
//                     zIndex: 600,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-end",
//                     gap: 0.5,
//                   }}
//                 >
//                   <Tooltip title={lastRefreshed ? `Last updated: ${lastRefreshed.toLocaleTimeString()}` : "Refresh live location"} placement="left">
//                     <Box
//                       onClick={handleRefreshLiveLocation}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         bgcolor: "rgba(255,255,255,0.92)",
//                         backdropFilter: "blur(10px)",
//                         borderRadius: "24px",
//                         px: 1.5,
//                         py: 0.75,
//                         boxShadow: `0 4px 16px ${alpha("#22c55e", 0.35)}`,
//                         border: `1.5px solid ${alpha("#22c55e", 0.4)}`,
//                         cursor: isRefreshing ? "not-allowed" : "pointer",
//                         transition: "all 0.2s ease",
//                         "&:hover": !isRefreshing ? {
//                           bgcolor: "rgba(255,255,255,1)",
//                           boxShadow: `0 6px 20px ${alpha("#22c55e", 0.5)}`,
//                           transform: "translateY(-1px)",
//                         } : {},
//                       }}
//                     >
//                       {/* Pulsing live dot */}
//                       <Box sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: "50%",
//                         bgcolor: "#22c55e",
//                         flexShrink: 0,
//                         animation: "liveDot 1.4s ease-in-out infinite",
//                         "@keyframes liveDot": {
//                           "0%, 100%": { opacity: 1, transform: "scale(1)" },
//                           "50%": { opacity: 0.35, transform: "scale(0.65)" },
//                         },
//                       }} />

//                       <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#15803d", letterSpacing: "0.3px", userSelect: "none" }}>
//                         LIVE
//                       </Typography>

//                       <Box sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 22,
//                         height: 22,
//                         borderRadius: "50%",
//                         bgcolor: alpha("#22c55e", 0.12),
//                         flexShrink: 0,
//                       }}>
//                         {isRefreshing ? (
//                           <CircularProgress size={13} sx={{ color: "#22c55e" }} />
//                         ) : (
//                           <RefreshIcon sx={{
//                             fontSize: 14,
//                             color: "#22c55e",
//                             transition: "transform 0.6s ease",
//                             transform: refreshSpinning ? "rotate(360deg)" : "rotate(0deg)",
//                           }} />
//                         )}
//                       </Box>
//                     </Box>
//                   </Tooltip>

//                   {lastRefreshed && (
//                     <Typography sx={{
//                       fontSize: "0.52rem",
//                       color: alpha("#15803d", 0.8),
//                       bgcolor: "rgba(255,255,255,0.85)",
//                       backdropFilter: "blur(6px)",
//                       borderRadius: "10px",
//                       px: 1,
//                       py: 0.2,
//                       border: `1px solid ${alpha("#22c55e", 0.2)}`,
//                     }}>
//                       Updated {lastRefreshed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
//                     </Typography>
//                   )}
//                 </Box>
//               </Zoom>
//             )}

//             {renderPhotoCarousel()}
//           </Grid>

//           {/* Session list (desktop) */}
//           {!isMobile && (
//             <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}>
//               {renderSessionList()}
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {/* Mobile drawer */}
//       {isMobile && (
//         <>
//           <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
//             <MenuIcon />
//           </Fab>
//           <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
//             <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>
//                   {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//                 </Typography>
//               </Box>
//               <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 56px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}

//       {renderPhotoModal()}
//     </Box>
//   );
// };

// export default Locations;




import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
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
  Modal,
  Fade,
  Popover,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  Photo as PhotoIcon,
  Timer as TimerIcon,
  Straighten as StraightenIcon,
  Flag as FlagIcon,
  Start as StartIcon,
  PinDrop as PinDropIcon,
  Collections as CollectionsIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { getSessionDetails, getUserAvailableDates, getUserSessionsByDate } from "../redux/slices/userSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";

// Fix Leaflet default icons
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
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
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

const hasValidPhoto = (photo) =>
  !!(photo && photo.url && photo.url !== null && photo.url !== "" &&
    typeof photo.url === "string" &&
    (photo.url.startsWith("http://") || photo.url.startsWith("https://")));

const getLat = (location) => location?.latitude || location?.lat || 0;
const getLng = (location) => location?.longitude || location?.lng || 0;

const getAddress = (location) => {
  if (location?.address && location.address !== "Unknown Address" && location.address !== "N/A")
    return location.address;
  return "Address not available";
};

const getValidLocations = (locations) => {
  if (!locations || locations.length === 0) return [];
  return locations
    .filter((loc) => hasValidCoordinates(loc))
    .sort((a, b) => {
      const tA = a.timestamp || a.time || a.createdAt;
      const tB = b.timestamp || b.time || b.createdAt;
      return new Date(tA) - new Date(tB);
    });
};

const calcTotalDistance = (locations) => {
  const valid = getValidLocations(locations);
  if (valid.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < valid.length; i++)
    total += calcDistance(getLat(valid[i - 1]), getLng(valid[i - 1]), getLat(valid[i]), getLng(valid[i]));
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
  return new Date(ts).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
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
  if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [], remark: null };
  let duration = session.duration || session.stats?.duration || session.totalDuration || 0;
  let distance = session.totalDistance || session.stats?.totalDistance || session.distance || 0;
  const locations = session.locations || session.timeline || [];
  if ((!duration || duration === 0) && locations.length >= 2) {
    const firstLoc = locations[0];
    const lastLoc = locations[locations.length - 1];
    if (firstLoc?.timestamp && lastLoc?.timestamp)
      duration = (new Date(lastLoc.timestamp) - new Date(firstLoc.timestamp)) / 1000;
  }
  if ((!distance || distance === 0) && locations.length >= 2)
    distance = calcTotalDistance(locations);
  return {
    distance, duration,
    startTime: session.startTime || session.stats?.startTime || null,
    endTime: session.endTime || session.stats?.endTime || null,
    locations,
    remark: session.remark || null,
  };
};

const isSameLatLng = (lat1, lng1, lat2, lng2) =>
  Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

const checkIsActive = (session) => {
  if (!session) return false;

  if (session.remark === "Tracking ended") return false;

  const locations = session.locations || (session.stats && session.stats.locations) || [];
  if (locations.length > 0) {
    const lastLoc = locations[locations.length - 1];
    if (lastLoc.remark === "Tracking ended") {
      return false;
    }
  }

  return session.isActive === true || session.isActive === "true" || session.isActive === 1 || session.isActive === "1";
};

const getUniquePhotos = (photos) => {
  if (!photos || !Array.isArray(photos)) return [];
  const unique = [];
  const seenList = [];
  photos.forEach(photo => {
    if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
    const lat = getLat(photo.location);
    const lng = getLng(photo.location);
    const ts = photo.timestamp || 0;

    const isDuplicate = seenList.some(s =>
      Math.abs(s.lat - lat) < 0.00001 &&
      Math.abs(s.lng - lng) < 0.00001 &&
      Math.abs(s.ts - ts) < 60000
    );

    if (!isDuplicate) {
      seenList.push({ lat, lng, ts });
      unique.push(photo);
    }
  });
  return unique;
};

// ─── Marker factories ──────────────────────────────────────────────────────────
const makeStartIcon = (color, time, hasPhoto = false, size = 28) =>
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
    className: "", iconSize: [size, size + 20], iconAnchor: [size / 2, size + 10],
  });

const makeEndIcon = (color, time, hasPhoto = false, size = 28) =>
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
    className: "", iconSize: [size, size + 20], iconAnchor: [size / 2, size + 10],
  });

const makePhotoIcon = (photoUrl, time, size = 28) =>
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
    className: "", iconSize: [size, size + 20], iconAnchor: [size / 2, size + 10],
  });

const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#22c55e,#15803d);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;bottom:2px;right:2px;background:#22c55e;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🚀</span>
        </div>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #22c55e;z-index:1;font-weight:500;">
        ${time} 📍 START
      </div>
    </div>`,
    className: "", iconSize: [size, size + 28], iconAnchor: [size / 2, size + 15],
  });

const makeEndWithPhotoIcon = (photoUrl, time, color = "#ef4444", size = 34) => {
  const gradientColor = color === "#22c55e" ? "linear-gradient(135deg,#22c55e,#15803d)" : "linear-gradient(135deg,#ef4444,#dc2626)";
  const overlayColor = color === "#22c55e" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)";
  return L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${gradientColor};border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:${overlayColor};display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;bottom:2px;right:2px;background:${color};border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🏁</span>
        </div>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid ${color};z-index:1;font-weight:500;">
        ${time} 🏁 END
      </div>
    </div>`,
    className: "", iconSize: [size, size + 28], iconAnchor: [size / 2, size + 15],
  });
};

const makeMovingIcon = (color = "#2196F3", time, size = 24) =>
  L.divIcon({
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;display:flex;flex-direction:column;align-items:center;">
        <div style="position:absolute;top:0;left:0;width:${size}px;height:${size}px;border-radius:50%;background:${color}25;animation:liveRing1 1.6s ease-out infinite;pointer-events:none;"></div>
        <div style="position:absolute;top:-4px;left:-4px;width:${size + 8}px;height:${size + 8}px;border-radius:50%;background:${color}18;animation:liveRing2 1.6s ease-out infinite 0.4s;pointer-events:none;"></div>
        <div style="position:absolute;top:-8px;left:-8px;width:${size + 16}px;height:${size + 16}px;border-radius:50%;background:${color}10;animation:liveRing3 1.6s ease-out infinite 0.8s;pointer-events:none;"></div>
        <div style="position:absolute;top:0;left:0;width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.28);animation:liveCore 1.2s ease-in-out infinite;z-index:2;"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${Math.round(size / 3)}px;height:${Math.round(size / 3)}px;border-radius:50%;background:#fff;opacity:0.9;z-index:3;pointer-events:none;"></div>
        <div style="position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.82);color:#fff;padding:2px 8px;border-radius:12px;font-size:7px;white-space:nowrap;border:1px solid ${color};font-weight:600;letter-spacing:0.3px;z-index:4;pointer-events:none;">📍 ${time}</div>
        <style>
          @keyframes liveRing1{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.4);opacity:0}}
          @keyframes liveRing2{0%{transform:scale(1);opacity:.4}100%{transform:scale(2.9);opacity:0}}
          @keyframes liveRing3{0%{transform:scale(1);opacity:.25}100%{transform:scale(3.6);opacity:0}}
          @keyframes liveCore{0%,100%{transform:scale(1)}50%{transform:scale(0.87)}}
        </style>
      </div>`,
    className: "", iconSize: [size, size + 30], iconAnchor: [size / 2, size / 2 + 3],
  });

const animateMarker = (marker, startLatLng, endLatLng, duration = 1000) => {
  const startTime = performance.now();
  const step = (currentTime) => {
    if (!marker || !marker._map) return;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const t = progress * (2 - progress); // easeOutQuad
    const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * t;
    const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * t;
    marker.setLatLng([lat, lng]);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Locations = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    sessions: initialSessions = [],
    selectedSessionId: initialSelectedSessionId,
    selectedDate: initialSelectedDate,
    summary = {},
    metadata = {},
  } = location.state || {};

  const sessionDetails = useSelector((state) => state.user?.sessionDetails);
  const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);
  const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
  const userSessionsByDate = useSelector((state) => state.user?.userSessionsList || []);

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
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [sessionPhotos, setSessionPhotos] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate ? new Date(initialSelectedDate) : new Date());
  const [selectedDateSessions, setSelectedDateSessions] = useState([]);
  const [loadingSessionsByDate, setLoadingSessionsByDate] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [mapZoom, setMapZoom] = useState(16);
  const [refreshSpinning, setRefreshSpinning] = useState(false);
  const [rootTop, setRootTop] = useState(0);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylines = useRef([]);
  const markers = useRef([]);
  const markerRefs = useRef(new Map());
  const fetchedSessions = useRef(new Set());
  const sessionDataCache = useRef(new Map());
  const isInitialLoad = useRef(true);
  const lastFitBoundsSessionId = useRef(null);
  const lastDrawnSessionId = useRef(null);
  const flyToLiveAfterRefresh = useRef(false);
  const rootRef = useRef(null);

  const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
  const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);
  const drawerOpen = activeDrawer === "sessions";
  const drawerPaperSx = { width: { xs: "85%", sm: 300 }, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 };

  const isSelectedSessionActive = checkIsActive(selectedSession);

  const formatBackendDate = (date) =>
    date.getFullYear() + "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
    date.getDate().toString().padStart(2, "0");

  const isDateAvailable = (date) => availableDates.includes(formatBackendDate(date));

  const fetchSessionsForDate = useCallback(async (date) => {
    const userId = metadata?.userId || metadata?.trackId;
    if (!userId) return;
    setLoadingSessionsByDate(true);
    await dispatch(getUserSessionsByDate({ userId, date: formatBackendDate(date), limit: 50 }));
    setLoadingSessionsByDate(false);
  }, [dispatch, metadata?.userId, metadata?.trackId]);

  const handleRefreshLiveLocation = useCallback(async () => {
    if (!selectedSessionId || isRefreshing) return;
    const userId = metadata?.userId || metadata?.trackId;
    if (!userId) return;
    setIsRefreshing(true);
    setRefreshSpinning(true);
    flyToLiveAfterRefresh.current = true;
    try {
      sessionDataCache.current.delete(String(selectedSessionId));
      fetchedSessions.current.delete(String(selectedSessionId));
      await dispatch(getSessionDetails({ userId, sessionId: String(selectedSessionId) }));
      setLastRefreshed(new Date());
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setRefreshSpinning(false), 600);
    }
  }, [selectedSessionId, isRefreshing, metadata, dispatch]);

  useEffect(() => {
    if (userSessionsByDate && userSessionsByDate.length > 0) {
      const formatted = userSessionsByDate.map((s) => ({
        _id: s._id,
        sessionId: s.sessionId,
        startTime: s.startTime,
        endTime: s.endTime,
        totalDistance: s.totalDistance,
        isActive: s.isActive,
        totalUploadedPhotos: s.totalUploadedPhotos,
        remark: s.remark,
        duration: s.startTime && s.endTime
          ? (new Date(s.endTime) - new Date(s.startTime)) / 1000 : 0,
        hasFullData: false,
      }));
      setSelectedDateSessions(formatted);
      setAllSessions(formatted);
    } else {
      setSelectedDateSessions([]);
      setAllSessions([]);
    }
  }, [userSessionsByDate]);

  useEffect(() => {
    const userId = metadata?.userId || metadata?.trackId;
    if (userId) dispatch(getUserAvailableDates({ id: userId }));
  }, [dispatch, metadata?.userId, metadata?.trackId]);

  useEffect(() => {
    if (selectedDate) fetchSessionsForDate(selectedDate);
  }, [selectedDate, fetchSessionsForDate]);

  // Measure root top offset for proper height calculation
  useEffect(() => {
    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      setRootTop(rect.top);
    }
    const handleResize = () => {
      if (rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();
        setRootTop(rect.top);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getStartEndFromPhotos = useCallback((session) => {
    if (!session) return { startPoint: null, endPoint: null };
    const stats = getSessionStats(session);
    const locs = getValidLocations(stats.locations);
    const photos = (session.photos || []).filter(
      (p) => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location)
    );
    const sortedPhotos = photos.length > 0
      ? [...photos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      : [];

    let sp = locs.length > 0 ? {
      lat: getLat(locs[0]), lng: getLng(locs[0]),
      timestamp: locs[0].timestamp || locs[0].time || locs[0].createdAt,
      address: getAddress(locs[0]),
    } : null;

    let ep = locs.length > 1 ? {
      lat: getLat(locs[locs.length - 1]), lng: getLng(locs[locs.length - 1]),
      timestamp: locs[locs.length - 1].timestamp || locs[locs.length - 1].time || locs[locs.length - 1].createdAt,
      address: getAddress(locs[locs.length - 1]),
    } : (locs.length === 1 ? { ...sp } : null);

    if (sortedPhotos.length > 0) {
      const fp = sortedPhotos[0];
      const lp = sortedPhotos[sortedPhotos.length - 1];
      sp = { lat: getLat(fp.location), lng: getLng(fp.location), timestamp: fp.timestamp, address: fp.address || getAddress(fp.location), photo: fp.url };
      if (lp) ep = { lat: getLat(lp.location), lng: getLng(lp.location), timestamp: lp.timestamp, address: lp.address || getAddress(lp.location), photo: lp.url };
    }
    return { startPoint: sp, endPoint: ep };
  }, []);

  const buildSessionPhotos = useCallback((session) => {
    if (!session) return [];
    const isActive = checkIsActive(session);
    const rawPhotos = session.photos || [];

    // if (isActive) {
    //   const validPhotos = rawPhotos.filter((p) => hasValidPhoto(p))
    //     .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    //   return validPhotos.map((photo, idx) => {
    //     const pLat = photo.location && hasValidCoordinates(photo.location) ? getLat(photo.location) : null;
    //     const pLng = photo.location && hasValidCoordinates(photo.location) ? getLng(photo.location) : null;
    //     const type = idx === 0 ? "start" : idx === validPhotos.length - 1 ? "end" : "route";
    //     return { key: type === "start" ? "start" : type === "end" ? "end" : `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type };
    //   });
    // }

    // It Taking Add Photo as Photo stop
    const deduplicatedPhotos = getUniquePhotos(session.photos);

    if (isActive) {
      const validPhotos = deduplicatedPhotos.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      return validPhotos.map((photo, idx) => {
        const pLat = getLat(photo.location);
        const pLng = getLng(photo.location);
        const type = idx === 0 ? "start" : "route";
        return {
          key: type === "start" ? "start" : `photo_${idx}`,
          idx, url: photo.url, timestamp: photo.timestamp,
          address: photo.address || "Address not available",
          lat: pLat, lng: pLng, type
        };
      });
    }
    const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
    const result = [];
    const seenUrls = new Set();
    const seenLatLng = new Set();
    const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

    if (sp && sp.photo && !seenUrls.has(sp.photo)) {
      const latLngKey = getLatLngKey(sp.lat, sp.lng);
      if (!seenLatLng.has(latLngKey)) {
        seenUrls.add(sp.photo); seenLatLng.add(latLngKey);
        result.push({ key: "start", url: sp.photo, timestamp: sp.timestamp, address: sp.address, lat: sp.lat, lng: sp.lng, type: "start" });
      }
    }
    deduplicatedPhotos.forEach((photo, idx) => {
      if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
      if (seenUrls.has(photo.url)) return;
      const pLat = getLat(photo.location), pLng = getLng(photo.location);
      const latLngKey = getLatLngKey(pLat, pLng);
      if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
      if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
      if (seenLatLng.has(latLngKey)) return;
      seenUrls.add(photo.url); seenLatLng.add(latLngKey);
      result.push({ key: `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type: "route" });
    });
    if (ep && ep.photo && !seenUrls.has(ep.photo)) {
      const latLngKey = getLatLngKey(ep.lat, ep.lng);
      const notSameAsStart = !(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng));
      if (notSameAsStart && !seenLatLng.has(latLngKey)) {
        seenUrls.add(ep.photo); seenLatLng.add(latLngKey);
        result.push({ key: "end", url: ep.photo, timestamp: ep.timestamp, address: ep.address, lat: ep.lat, lng: ep.lng, type: "end" });
      }
    }
    return result;
  }, [getStartEndFromPhotos]);

  const processSessionData = useCallback((sessionData) => {
    if (!sessionData) return;
    setSelectedSession(sessionData);
    setIsLoadingSession(false);
    const stats = getSessionStats(sessionData);
    const validLocations = getValidLocations(stats.locations || []);
    if (validLocations.length > 0) {
      setHasLocations(true);
      setTotalDistance(stats.distance);
      setTotalDuration(stats.duration);
      setStartTime(stats.startTime);
      setEndTime(stats.endTime);
      if (mapInstance.current) setTimeout(() => drawMapWithSession(sessionData, showPhotoMarkers), 100);
    } else {
      setHasLocations(false);
    }
  }, [showPhotoMarkers]);

  const handleSessionSelect = useCallback((sessionId) => {
    const id = String(sessionId);
    if (selectedSessionId === id && selectedSession) return;
    setSelectedSessionId(id);
    setIsLoadingSession(true);
    setLastRefreshed(null);
    if (sessionDataCache.current.has(id)) {
      const cached = sessionDataCache.current.get(id);
      if (cached.locations && cached.locations.length > 0) { processSessionData(cached); return; }
    }
    const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);
    if (foundSession) {
      if (foundSession.locations && foundSession.locations.length > 0) {
        const stats = getSessionStats(foundSession);
        const merged = { ...foundSession, ...stats };
        sessionDataCache.current.set(id, merged);
        processSessionData(merged);
      } else if (!fetchedSessions.current.has(id)) {
        const userId = metadata?.userId || metadata?.trackId;
        if (userId) { fetchedSessions.current.add(id); dispatch(getSessionDetails({ userId, sessionId: id })); }
        else { setIsLoadingSession(false); setSelectedSession(null); setHasLocations(false); }
      }
    } else { setIsLoadingSession(false); setSelectedSession(null); setHasLocations(false); }
    if (isMobile) setActiveDrawer("sessions");
  }, [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]);

  useEffect(() => {
    if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
      const id = String(sessionDetails.sessionId);
      const stats = getSessionStats(sessionDetails);
      const originalSession = userSessionsByDate.find(s => String(s.sessionId || s._id) === id);
      const merged = { ...originalSession, ...sessionDetails, ...stats, isActive: sessionDetails.isActive !== undefined ? sessionDetails.isActive : originalSession?.isActive };
      sessionDataCache.current.set(id, merged);
      setSessionStatsMap((prev) => { const m = new Map(prev); m.set(id, stats); return m; });
      setAllSessions((prev) => prev.map((s) => String(s.sessionId || s._id) === id ? { ...s, remark: sessionDetails.remark || s.remark } : s));
      processSessionData(merged);
    }
  }, [sessionDetails, selectedSessionId, userSessionsByDate, processSessionData]);

  // Poll live session details every 2 seconds when open this page if the user is online and the session date is today
  useEffect(() => {
    const userId = metadata?.userId || metadata?.trackId;
    if (!userId || !selectedSessionId || !isSelectedSessionActive) return;

    // Get the most recent location's isOnline status
    const stats = getSessionStats(selectedSession);
    const validLocations = getValidLocations(stats.locations || []);
    const mostRecent = validLocations[validLocations.length - 1];
    const isOnline = mostRecent?.isOnline === true;

    // Check if the session's start date is today
    const today = new Date();
    const sessionStartDate = stats.startTime ? new Date(stats.startTime) : null;
    const isSameDate = sessionStartDate &&
      today.getFullYear() === sessionStartDate.getFullYear() &&
      today.getMonth() === sessionStartDate.getMonth() &&
      today.getDate() === sessionStartDate.getDate();

    // If not online OR the start date is not today, do not poll (call only first time, which is handled on mount/selection)
    if (!isOnline || !isSameDate) return;

    const poll = async () => {
      try {
        sessionDataCache.current.delete(String(selectedSessionId));
        fetchedSessions.current.delete(String(selectedSessionId));
        await dispatch(getSessionDetails({ userId, sessionId: String(selectedSessionId) }));
        setLastRefreshed(new Date());
      } catch (err) {
        console.error("Auto-refresh failed:", err);
      }
    };

    const intervalId = setInterval(poll, 2000);
    return () => clearInterval(intervalId);
  }, [selectedSessionId, isSelectedSessionActive, selectedSession, metadata?.userId, metadata?.trackId, dispatch]);

  useEffect(() => {
    if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
      let targetId = null;
      if (isInitialLoad.current && initialSelectedSessionId) {
        const idStr = String(initialSelectedSessionId);
        if (allSessions.some(s => String(s.sessionId || s._id) === idStr)) targetId = idStr;
      }
      if (!targetId) {
        const top = allSessions[allSessions.length - 1];
        targetId = String(top.sessionId || top._id);
      }
      handleSessionSelect(targetId);
      isInitialLoad.current = false;
    }
  }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

  useEffect(() => {
    if (selectedSession) {
      const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(selectedSession);
      setStartPoint(sp);
      setEndPoint(ep);
      setSessionPhotos(buildSessionPhotos(selectedSession));
    }
  }, [selectedSession, getStartEndFromPhotos, buildSessionPhotos]);

  // ── Map helpers ────────────────────────────────────────────────────────────
  const clearMap = (keepLive = false) => {
    if (!mapInstance.current) return;
    polylines.current.forEach((l) => {
      try {
        mapInstance.current.removeLayer(l);
      } catch (e) {
        console.error(e);
      }
    });
    markers.current.forEach((m) => {
      if (keepLive && m === markerRefs.current.get("live")) return;
      try {
        mapInstance.current.removeLayer(m);
      } catch (e) {
        console.error(e);
      }
    });
    polylines.current = [];
    if (keepLive && markerRefs.current.has("live")) {
      const liveMarker = markerRefs.current.get("live");
      markers.current = [liveMarker];
      markerRefs.current.clear();
      markerRefs.current.set("live", liveMarker);
    } else {
      markers.current = [];
      markerRefs.current.clear();
    }
  };

  // const drawMapWithSession = useCallback((session, showPhotos) => {
  //   if (!mapInstance.current) return;
  //   const stats = getSessionStats(session);
  //   const allLocations = stats.locations || [];
  //   if (!allLocations.length) return;
  //   clearMap();
  //   const validLocations = getValidLocations(allLocations);
  //   if (validLocations.length === 0) return;

  //   for (let i = 0; i < validLocations.length - 1; i++) {
  //     const line = L.polyline(
  //       [[getLat(validLocations[i]), getLng(validLocations[i])], [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])]],
  //       { color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444", weight: 3, opacity: 0.8, lineJoin: "round", lineCap: "round" }
  //     ).addTo(mapInstance.current);
  //     polylines.current.push(line);
  //   }

  //   if (startPoint && hasValidCoordinates(startPoint)) {
  //     const popupContent = `<div style="min-width:180px;max-width:240px;font-family:inherit;"><div style="background:linear-gradient(135deg,#22c55e,#15803d);color:white;padding:8px 12px;border-radius:8px 8px 0 0;margin:-14px -20px 10px -20px;"><div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b style="font-size:13px;letter-spacing:0.5px">START POINT</b></div></div><div style="padding:4px 0;"><div style="font-size:12px;color:#666;margin-bottom:2px;"><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div><div style="font-size:12px;color:#666;margin-bottom:4px;"><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>${startPoint.photo ? `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:8px;"><img src="${startPoint.photo}" style="width:100%;max-height:140px;object-fit:cover;border-radius:8px;cursor:pointer;" onclick="window.open('${startPoint.photo}','_blank')"/></div>` : ""}</div></div>`;
  //     const icon = startPoint.photo ? makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34) : makeStartIcon("#22c55e", fmtTime(startPoint.timestamp), false, 28);
  //     const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 }).bindPopup(popupContent, { maxWidth: 260, minWidth: 180 }).addTo(mapInstance.current);
  //       markers.current.push(m); markerRefs.current.set(markerKey, m);
  //     });
  //   }

  //   if (flyToLiveAfterRefresh.current && checkIsActive(session)) {
  //     flyToLiveAfterRefresh.current = false;
  //     const liveTarget = [...validLocations].reverse().find((l) => l.isOnline === true) ?? (validLocations.length > 0 ? validLocations[validLocations.length - 1] : null);
  //     if (liveTarget) { mapInstance.current.flyTo([getLat(liveTarget), getLng(liveTarget)], 16, { animate: true, duration: 1.0 }); return; }
  //   }

  //   if (validLocations.length > 0 && lastFitBoundsSessionId.current !== String(session.sessionId || session._id)) {
  //     const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
  //     mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
  //     lastFitBoundsSessionId.current = String(session.sessionId || session._id);
  //   }
  // }, [startPoint, endPoint, showPhotoMarkers]);

  // ── Map init ───────────────────────────────────────────────────────────────

  const drawMapWithSession = useCallback((session, showPhotos) => {
    if (!mapInstance.current) return;
    const stats = getSessionStats(session);
    const allLocations = stats.locations || [];
    if (!allLocations.length) return;
    const sessionIdStr = String(session.sessionId || session._id);
    const isSameSession = lastDrawnSessionId.current === sessionIdStr;
    clearMap(isSameSession);
    lastDrawnSessionId.current = sessionIdStr;
    const validLocations = getValidLocations(allLocations);
    if (validLocations.length === 0) return;

    // Zoom-based arrow size and interval calculation
    // Zoom >= 16 (closer, ~500m scale): arrow size 24px
    // Zoom 14-15 (~1km - 2km scale): arrow size 18px
    // Zoom < 14: arrow size 12px
    let arrowSize = 18;
    if (mapZoom >= 16) {
      arrowSize = 24;
    } else if (mapZoom < 14) {
      arrowSize = 12;
    }

    // Adjust arrow interval based on zoom level
    let arrowDistanceInterval = 500;
    if (mapZoom >= 17) {
      arrowDistanceInterval = 100;
    } else if (mapZoom === 16) {
      arrowDistanceInterval = 250;
    } else if (mapZoom === 15) {
      arrowDistanceInterval = 500;
    } else {
      arrowDistanceInterval = 1000;
    }

    let accumulatedDistance = 0;

    for (let i = 0; i < validLocations.length - 1; i++) {
      const p1 = [getLat(validLocations[i]), getLng(validLocations[i])];
      const p2 = [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])];
      const color = validLocations[i].isOnline === true ? "#3553ea" : "#ef4444";

      const line = L.polyline(
        [p1, p2],
        { color, weight: 3, opacity: 0.8, lineJoin: "round", lineCap: "round" }
      ).addTo(mapInstance.current);
      polylines.current.push(line);

      // Add a forward-pointing Material-like open arrow at specified distance intervals
      const dist = calcDistance(p1[0], p1[1], p2[0], p2[1]);
      accumulatedDistance += dist;

      if (accumulatedDistance >= arrowDistanceInterval) {
        const decorator = L.polylineDecorator([p1, p2], {
          patterns: [
            {
              offset: '50%',
              repeat: 0,
              symbol: L.Symbol.marker({
                rotate: true,
                markerOptions: {
                  icon: L.divIcon({
                    html: `<svg viewBox="0 0 24 24" width="${arrowSize}" height="${arrowSize}" style="display: block; filter: drop-shadow(0px 1px 1.5px rgba(0,0,0,0.75));"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="#FFFFFF"/></svg>`,
                    iconSize: [arrowSize, arrowSize],
                    iconAnchor: [arrowSize / 2, arrowSize / 2],
                    className: ''
                  })
                }
              })
            }
          ]
        }).addTo(mapInstance.current);
        polylines.current.push(decorator);
        accumulatedDistance = 0; // Reset accumulator
      }
    }

    if (startPoint && hasValidCoordinates(startPoint)) {
      const popupContent = `<div style="min-width:200px;font-family: system-ui, -apple-system, sans-serif;">
    <div style="display:flex;align-items:center;gap:10px;padding:12px 12px 8px 12px;border-bottom:2px solid #22c55e">
      <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
        <span style="font-size:16px">🚀</span>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#1f2937">Start Point</div>
        <div style="font-size:10px;color:#22c55e">Beginning of journey</div>
      </div>
    </div>
    <div style="padding:12px">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <span style="font-size:11px;color:#6b7280">🕐</span>
        <span style="font-size:11px;color:#374151;font-weight:500">${fmtTime(startPoint.timestamp)}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px">
        <span style="font-size:11px;color:#6b7280">📅</span>
        <span style="font-size:11px;color:#374151">${fmtDate(startPoint.timestamp)}</span>
      </div>
      ${startPoint.photo ? `
      <div style="margin-top:8px;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);cursor:pointer;transition:transform 0.2s">
        <img src="${startPoint.photo}" style="width:100%;max-height:160px;object-fit:cover;display:block" onclick="window.open('${startPoint.photo}','_blank')"/>
      </div>
      <div style="margin-top:8px;text-align:center">
        <span style="font-size:9px;color:#9ca3af">📱 Click image to view full size</span>
      </div>
      ` : ''}
    </div>
  </div>`;

      const icon = startPoint.photo ? makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34) : makeStartIcon("#22c55e", fmtTime(startPoint.timestamp), false, 28);
      const m = L.marker([startPoint.lat, startPoint.lng], {
        icon,
        zIndexOffset: 1000
      }).bindPopup(popupContent, {
        maxWidth: 260,
        minWidth: 200,
        className: 'photo-popup'
      }).addTo(mapInstance.current);

      markers.current.push(m);
      markerRefs.current.set("start", m);
    } else if (validLocations.length > 0) {
      const fb = validLocations[0];
      const popupContent = `<div style="min-width:160px;max-width:200px;"><div style="background:#22c55e;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;"><b style="font-size:11px">🚀 START POINT</b></div><div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div></div>`;
      const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 }).bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
      markers.current.push(m); markerRefs.current.set("start", m);
    }

    const isActive = checkIsActive(session);

    if (isActive && validLocations.length > 0) {
      const mostRecent = validLocations[validLocations.length - 1];
      const isSameAsStart =
        validLocations.length === 1 ||
        isSameLatLng(
          getLat(mostRecent), getLng(mostRecent),
          getLat(validLocations[0]), getLng(validLocations[0])
        );

      if (!isSameAsStart) {
        const ts = mostRecent.timestamp || mostRecent.time || mostRecent.createdAt;
        const isOnline = mostRecent.isOnline === true;

        // Modern, clean popup design
        const popupContent = `<div style="min-width:180px;font-family: system-ui, -apple-system, sans-serif;">
    <div style="display:flex;align-items:center;gap:10px;padding:12px 12px 8px 12px;border-bottom:2px solid ${isOnline ? '#22c55e' : '#9ca3af'}">
      <div style="width:32px;height:32px;border-radius:50%;background:${isOnline ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#9ca3af,#6b7280)'};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
        <span style="font-size:16px">${isOnline ? '📍' : '📌'}</span>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#1f2937">${isOnline ? 'Live Location' : 'Last Known'}</div>
        <div style="font-size:10px;color:${isOnline ? '#22c55e' : '#9ca3af'};display:flex;align-items:center;gap:4px">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${isOnline ? '#22c55e' : '#9ca3af'};${isOnline ? 'animation: pulse 1s infinite' : ''}"></span>
          ${isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
    </div>
    <div style="padding:10px 12px">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
        <span style="font-size:11px;color:#6b7280">🕐</span>
        <span style="font-size:11px;color:#374151;font-weight:500">${fmtTime(ts)}</span>
      </div>
      <div style="display:flex;gap:6px">
        <span style="font-size:11px;color:#6b7280">📍</span>
        <span style="font-size:11px;color:#4b5563;line-height:1.3">${getAddress(mostRecent).substring(0, 80)}${getAddress(mostRecent).length > 80 ? '...' : ''}</span>
      </div>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    </style>
  </div>`;

        const markerColor = isOnline ? "#22c55e" : "#9ca3af";
        const icon = makeMovingIcon(markerColor, fmtTime(ts), 24);
        let m = markerRefs.current.get("live");
        if (m) {
          const oldLatLng = m.getLatLng();
          const newLatLng = L.latLng(getLat(mostRecent), getLng(mostRecent));
          if (oldLatLng.lat !== newLatLng.lat || oldLatLng.lng !== newLatLng.lng) {
            animateMarker(m, oldLatLng, newLatLng, 1000);
          }
          m.setPopupContent(popupContent);
          m.setIcon(icon);
        } else {
          m = L.marker([getLat(mostRecent), getLng(mostRecent)], {
            icon,
            zIndexOffset: 1100
          }).bindPopup(popupContent, {
            maxWidth: 220,
            minWidth: 180,
            className: 'clean-popup'
          }).addTo(mapInstance.current);
          markers.current.push(m);
          markerRefs.current.set("live", m);
        }

        // Clean popup styles
        if (!document.querySelector('#clean-popup-styles')) {
          const style = document.createElement('style');
          style.id = 'clean-popup-styles';
          style.textContent = `
      .clean-popup .leaflet-popup-content-wrapper {
        border-radius: 16px;
        padding: 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        background: white;
      }
      .clean-popup .leaflet-popup-content {
        margin: 0;
        min-width: 180px;
      }
      .clean-popup .leaflet-popup-tip {
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
    `;
          document.head.appendChild(style);
        }

        markers.current.push(m);
        markerRefs.current.set("live", m);
      }
    } else if (!isActive) {
      if (endPoint && hasValidCoordinates(endPoint)) {
        const isOnline = endPoint.isOnline === true;
        const markerColor = isOnline ? "#22c55e" : "#ef4444";
        const themeColor = isOnline ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#ef4444,#dc2626)";
        const statusLabel = isOnline ? "Online" : "Journey completed";
        const statusDot = isOnline ? `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#22c55e;animation: pulse 1s infinite; margin-right: 4px;"></span>` : "";

        const popupContent = `<div style="min-width:200px;font-family: system-ui, -apple-system, sans-serif;">
    <div style="display:flex;align-items:center;gap:10px;padding:12px 12px 8px 12px;border-bottom:2px solid ${markerColor}">
      <div style="width:32px;height:32px;border-radius:50%;background:${themeColor};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
        <span style="font-size:16px">🏁</span>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#1f2937">End Point</div>
        <div style="font-size:10px;color:${markerColor};display:flex;align-items:center;gap:4px">
          ${statusDot}
          ${statusLabel}
        </div>
      </div>
    </div>
    <div style="padding:12px">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
        <span style="font-size:11px;color:#6b7280">🕐</span>
        <span style="font-size:11px;color:#374151;font-weight:500">${fmtTime(endPoint.timestamp)}</span>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:12px">
        <span style="font-size:11px;color:#6b7280;flex-shrink:0">📍</span>
        <span style="font-size:11px;color:#4b5563;word-wrap:break-word;word-break:break-word;white-space:normal;line-height:1.4">${endPoint.address || "Address not available"}</span>
      </div>
      ${endPoint.photo ? `
      <div style="margin-top:8px;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);cursor:pointer;transition:transform 0.2s">
        <img src="${endPoint.photo}" style="width:100%;max-height:160px;object-fit:cover;display:block" onclick="window.open('${endPoint.photo}','_blank')"/>
      </div>
      <div style="margin-top:8px;text-align:center">
        <span style="font-size:9px;color:#9ca3af">📱 Click image to view full size</span>
      </div>
      ` : ''}
    </div>
  </div>`;

        const icon = endPoint.photo ? makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), markerColor, 34) : makeEndIcon(markerColor, fmtTime(endPoint.timestamp), false, 28);
        const m = L.marker([endPoint.lat, endPoint.lng], {
          icon,
          zIndexOffset: 1000
        }).bindPopup(popupContent, {
          maxWidth: 260,
          minWidth: 200,
          className: 'photo-popup'
        }).addTo(mapInstance.current);

        markers.current.push(m);
        markerRefs.current.set("end", m);
      } else if (validLocations.length > 1) {
        const lastLoc = validLocations[validLocations.length - 1];
        const isOnline = lastLoc.isOnline === true;
        const markerColor = isOnline ? "#22c55e" : "#ef4444";
        const themeColor = isOnline ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#ef4444,#dc2626)";
        const statusLabel = isOnline ? "Online" : "Journey completed";
        const statusDot = isOnline ? `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#22c55e;animation: pulse 1s infinite; margin-right:4px;"></span>` : "";

        const popupContent = `<div style="min-width:160px;max-width:200px;"><div style="background:${themeColor};color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;"><b style="font-size:11px">🏁 END POINT</b></div><div style="font-size:10px;display:flex;align-items:center;margin-bottom:4px;">${statusDot}<b>Status:</b> ${statusLabel}</div><div style="font-size:10px"><b>Time:</b> ${fmtTime(lastLoc.timestamp)}</div><div style="font-size:10px"><b>Address:</b> ${getAddress(lastLoc)}</div></div>`;
        const m = L.marker([getLat(lastLoc), getLng(lastLoc)], { icon: makeEndIcon(markerColor, fmtTime(lastLoc.timestamp), false, 28), zIndexOffset: 1000 }).bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
        markers.current.push(m); markerRefs.current.set("end", m);
      }
    }

    const uniqueMapPhotos = getUniquePhotos(session.photos);
    if (showPhotos && uniqueMapPhotos && uniqueMapPhotos.length > 0) {
      const sortedPhotos = [...uniqueMapPhotos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      sortedPhotos.forEach((photo, idx) => {
        if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
        const lat = getLat(photo.location), lng = getLng(photo.location);
        // Always skip photo marker if it overlaps the start point
        if (startPoint && hasValidCoordinates(startPoint) && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
        // For inactive sessions also skip if overlaps end point
        if (!isActive && endPoint && hasValidCoordinates(endPoint) && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;
        const isLast = isActive && idx === sortedPhotos.length - 1;
        const markerKey = isLast ? "end" : `photo_${idx}`;
        const label = isLast ? "Latest Photo" : "Route Photo";

        // Modern, clean photo popup design with time & remark on same line
        const popup = `<div style="min-width:200px;font-family: system-ui, -apple-system, sans-serif;">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 12px 8px 12px;border-bottom:2px solid #f59e0b">
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ea580c);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
          <span style="font-size:16px">📸</span>
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:#1f2937">${label}</div>
          <div style="font-size:10px;color:#f59e0b">${idx + 1} of ${sortedPhotos.length}</div>
        </div>
      </div>
      <div style="padding:12px">
        <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
            <span style="font-size:11px;color:#6b7280">🕐</span>
            <span style="font-size:11px;color:#374151;font-weight:500;white-space:nowrap">${fmtTime(photo.timestamp)}</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:4px;flex:1;min-width:120px">
            <span style="font-size:11px;color:#6b7280;flex-shrink:0">💬</span>
            <span style="font-size:11px;color:#4b5563;word-wrap:break-word;word-break:break-word;white-space:normal;line-height:1.4;font-style:${photo.remark ? 'normal' : 'italic'}">${photo.remark || "No remark"}</span>
          </div>
        </div>
        <div style="margin-top:8px;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);cursor:pointer;transition:transform 0.2s">
          <img src="${photo.url}" style="width:100%;max-height:160px;object-fit:cover;display:block" onclick="window.open('${photo.url}','_blank')"/>
        </div>
        <div style="margin-top:8px;text-align:center">
          <span style="font-size:9px;color:#9ca3af">📱 Click image to view full size</span>
        </div>
      </div>
    </div>`;

        const m = L.marker([lat, lng], {
          icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28),
          zIndexOffset: 950
        }).bindPopup(popup, {
          maxWidth: 260,
          minWidth: 200,
          className: 'photo-popup'
        }).addTo(mapInstance.current);

        markers.current.push(m);
        markerRefs.current.set(markerKey, m);
      });
    }

    // Add photo popup styles if not already added
    if (!document.querySelector('#photo-popup-styles')) {
      const style = document.createElement('style');
      style.id = 'photo-popup-styles';
      style.textContent = `
    .photo-popup .leaflet-popup-content-wrapper {
      border-radius: 16px;
      padding: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      background: white;
    }
    .photo-popup .leaflet-popup-content {
      margin: 0;
      min-width: 200px;
    }
    .photo-popup .leaflet-popup-tip {
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
  `;
      document.head.appendChild(style);
    }

    if (flyToLiveAfterRefresh.current && checkIsActive(session)) {
      flyToLiveAfterRefresh.current = false;
      const liveTarget = [...validLocations].reverse().find((l) => l.isOnline === true) ?? (validLocations.length > 0 ? validLocations[validLocations.length - 1] : null);
      if (liveTarget) { mapInstance.current.flyTo([getLat(liveTarget), getLng(liveTarget)], 18, { animate: true, duration: 1.0 }); return; }
    }

    if (validLocations.length > 0 && lastFitBoundsSessionId.current !== String(session.sessionId || session._id)) {
      const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
      mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
      lastFitBoundsSessionId.current = String(session.sessionId || session._id);
    }
  }, [startPoint, endPoint, showPhotoMarkers, mapZoom]);
  useEffect(() => {
    if (!mapRef.current || isMapInitialized) return;
    const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 16, minZoom: 3 });
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_APIKEY;
    const googleRoadmap = L.tileLayer(`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Maps", maxZoom: 19 });
    const googleSatellite = L.tileLayer(`https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Satellite", maxZoom: 19 });
    const googleHybrid = L.tileLayer(`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Hybrid", maxZoom: 19 });
    const googleTerrain = L.tileLayer(`https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${apiKey}`, { attribution: "&copy; Google Terrain", maxZoom: 19 });
    const baseMaps = { "Roadmap": googleRoadmap, "Satellite": googleSatellite, "Hybrid": googleHybrid, "Terrain": googleTerrain };
    googleRoadmap.addTo(map);
    L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);
    mapInstance.current = map;

    // Listen to zoom changes to adapt arrows size and distance intervals dynamically
    map.on('zoomend', () => {
      setMapZoom(map.getZoom());
    });

    setIsMapInitialized(true);
    if (selectedSession) setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
  }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

  useEffect(() => {
    if (mapInstance.current && selectedSession) setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
  }, [selectedSession, showPhotoMarkers, startPoint, endPoint, mapZoom, drawMapWithSession]);

  useEffect(() => {
    const onResize = () => { if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, []);

  useEffect(() => {
    const tilePane = document.querySelector(".leaflet-tile-pane");
    if (tilePane) {
      tilePane.style.filter = isDarkMode ? "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none";
      tilePane.style.transition = "filter 0.3s ease";
    }
  }, [isDarkMode, isMapInitialized]);

  const getPhotoCount = (session) => session?.photos?.length || 0;

  const handlePhotoClick = (photo) => {
    if (!mapInstance.current) return;
    const flyAndOpen = (latLng, markerKey) => {
      mapInstance.current.flyTo(latLng, 18, { animate: true, duration: 1.2 });
      if (markerKey && markerRefs.current.has(markerKey)) {
        const m = markerRefs.current.get(markerKey);
        mapInstance.current.once("moveend", () => m.openPopup());
      }
    };
    if (markerRefs.current.has(photo.key)) { const m = markerRefs.current.get(photo.key); flyAndOpen(m.getLatLng(), photo.key); return; }
    if (photo.type === "start" && markerRefs.current.has("start")) { const m = markerRefs.current.get("start"); flyAndOpen(m.getLatLng(), "start"); return; }
    if (photo.type === "end") {
      const key = markerRefs.current.has("end") ? "end" : markerRefs.current.has("live") ? "live" : null;
      if (key) { const m = markerRefs.current.get(key); flyAndOpen(m.getLatLng(), key); return; }
    }
    if (photo.lat && photo.lng) mapInstance.current.flyTo([photo.lat, photo.lng], 18, { animate: true, duration: 1.2 });
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    setCalendarAnchorEl(null);
    setSelectedSessionId(null);
    setSelectedSession(null);
    setHasLocations(false);
    setLastRefreshed(null);
    clearMap();
  };

  const toggleCalendar = (event) => { setCalendarAnchorEl(event.currentTarget); setShowCalendar(!showCalendar); };
  const closeCalendar = () => { setShowCalendar(false); setCalendarAnchorEl(null); };

  // ─── Photo Carousel — now inside session panel (bottom of right col) ───────
  // const renderPhotoCarousel = () => {
  //   if (!selectedSession || sessionPhotos.length === 0) return null;
  //   return (
  //     <Box sx={{ px: 1, pb: 1, pt: 0.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`, bgcolor: isDarkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", flexShrink: 0, overflow: "hidden" }}>
  //       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
  //         <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
  //         <Typography variant="caption" sx={{ color: isDarkMode ? "rgba(255,255,255,0.8)" : "text.secondary", fontWeight: 600, fontSize: "10px" }}>
  //           Photos ({sessionPhotos.length})
  //         </Typography>
  //       </Box>
  //       <Box sx={{ display: "flex", gap: 0.75, overflowX: "auto", overflowY: "hidden", pb: 0.5, "&::-webkit-scrollbar": { height: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: alpha("#2196F3", 0.3), borderRadius: 2 } }}>
  //         {sessionPhotos.map((photo, index) => {
  //           const isStart = photo.type === "start", isEnd = photo.type === "end";
  //           const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";
  //           return (
  //             <Box key={photo.key || index} onClick={() => handlePhotoClick(photo)} sx={{ flexShrink: 0, width: 54, height: 54, borderRadius: 1.5, overflow: "hidden", cursor: "pointer", border: `2px solid ${borderColor}`, position: "relative", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "scale(1.08)", boxShadow: `0 4px 12px ${alpha(borderColor, 0.4)}` } }}>
  //               <img src={photo.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  //               <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
  //                 {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
  //               </Box>
  //               <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.65)", color: "white", fontSize: "6px", textAlign: "center", py: 0.15, lineHeight: 1.4 }}>
  //                 {fmtTime(photo.timestamp)}
  //               </Typography>
  //             </Box>
  //           );
  //         })}
  //       </Box>
  //     </Box>
  //   );
  // };
  const renderPhotoCarousel = () => {
    if (!selectedSession || sessionPhotos.length === 0) return null;
    return (
      <Box sx={{ px: 1, pb: 1, pt: 0.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`, bgcolor: isDarkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", flexShrink: 0, overflow: "hidden" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
          <Typography variant="caption" sx={{ color: isDarkMode ? "rgba(255,255,255,0.8)" : "text.secondary", fontWeight: 600, fontSize: "10px" }}>
            Photos ({sessionPhotos.length})
          </Typography>
        </Box>
        <Box
          className="photo-scroll-container"
          sx={{
            display: "flex",
            gap: 0.75,
            overflowX: "auto",
            overflowY: "hidden",
            pb: 1,
            cursor: "grab",
            "&:active": { cursor: "grabbing" },
            // Make scrollbar visible and stylish
            "&::-webkit-scrollbar": {
              height: 8,
              WebkitAppearance: "none"
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: alpha(theme.palette.divider, 0.1),
              borderRadius: 4,
              margin: "0 4px"
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: alpha("#FF9800", 0.5),
              borderRadius: 4,
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: alpha("#FF9800", 0.7)
              }
            },
            // Firefox scrollbar styling
            scrollbarWidth: "thin",
            scrollbarColor: `${alpha("#FF9800", 0.5)} ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          {sessionPhotos.map((photo, index) => {
            const isStart = photo.type === "start", isEnd = photo.type === "end";
            const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";
            return (
              <Box key={photo.key || index} onClick={() => handlePhotoClick(photo)} sx={{ flexShrink: 0, width: 54, height: 54, borderRadius: 1.5, overflow: "hidden", cursor: "pointer", border: `2px solid ${borderColor}`, position: "relative", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "scale(1.08)", boxShadow: `0 4px 12px ${alpha(borderColor, 0.4)}` } }}>
                <img src={photo.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
                  {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
                </Box>
                <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.65)", color: "white", fontSize: "6px", textAlign: "center", py: 0.15, lineHeight: 1.4 }}>
                  {fmtTime(photo.timestamp)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };
  // ─── Photo Modal ───────────────────────────────────────────────────────────
  const renderPhotoModal = () => {
    if (!photoModalOpen || selectedPhotoIndex === null) return null;
    const currentPhoto = sessionPhotos[selectedPhotoIndex];
    const handleNext = () => setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
    const handlePrev = () => setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
    return (
      <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} closeAfterTransition sx={{ zIndex: 1300 }}>
        <Fade in={photoModalOpen}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 800, bgcolor: "black", borderRadius: 2, boxShadow: 24, overflow: "hidden" }}>
            <Box sx={{ position: "relative" }}>
              <IconButton onClick={() => setPhotoModalOpen(false)} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,0.5)", color: "white" }}><CloseIcon /></IconButton>
              <img src={currentPhoto?.url} alt="Full size" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
              <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white" }}><NavigateBeforeIcon /></IconButton>
              <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white" }}><NavigateNextIcon /></IconButton>
            </Box>
            <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
              <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                {currentPhoto?.type === "start" ? "🚀 Start Point" : currentPhoto?.type === "end" ? "🏁 End Point" : `📸 Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">{fmtDateTime(currentPhoto?.timestamp)}</Typography>
              <Typography variant="caption" display="block" color="text.secondary">📍 {currentPhoto?.address || "Address not available"}</Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  };

  // ─── Session List ─────────────────────────────────────────────────────────
  const renderSessionList = () => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Fixed Header */}
      <Box sx={{ px: 1.25, pt: 1.25, pb: 0.75, flexShrink: 0, borderBottom: `2px solid ${alpha("#2196F3", 0.15)}` }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box sx={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#2196F3,#1976D2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${alpha("#2196F3", 0.3)}` }}>
              <PinDropIcon sx={{ fontSize: 14, color: "white" }} />
            </Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: "0.7rem", background: "linear-gradient(135deg,#2196F3,#1976D2)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", letterSpacing: "0.5px" }}>
              SESSIONS
            </Typography>
            <Chip label={allSessions.length} size="small" sx={{ height: 18, fontSize: "0.55rem", fontWeight: 700, bgcolor: alpha("#2196F3", 0.12), color: "#2196F3", borderRadius: "8px" }} />
          </Box>
          <Button variant="outlined" size="small" onClick={toggleCalendar} startIcon={<CalendarIcon sx={{ fontSize: 12 }} />}
            sx={{ borderColor: alpha("#2196F3", 0.3), color: "#2196F3", fontSize: "0.58rem", py: 0.25, px: 0.75, borderRadius: "14px", textTransform: "none", "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.05) } }}>
            {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </Button>
          <Popover open={showCalendar} anchorEl={calendarAnchorEl} onClose={closeCalendar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{ sx: { borderRadius: 2, boxShadow: `0 4px 20px ${alpha("#000", 0.15)}`, p: 1 } }}>
            <style>{`
              .compact-calendar{border:none!important;font-family:inherit!important}
              .compact-calendar .react-calendar__tile{padding:8px 4px!important;line-height:1.2!important;font-size:.7rem!important;position:relative;border-radius:8px!important}
              .compact-calendar .react-calendar__navigation button{min-width:28px!important;height:28px!important;font-size:.72rem!important;padding:0!important;border-radius:6px!important}
              .compact-calendar .react-calendar__navigation{height:28px!important;margin-bottom:8px!important}
              .compact-calendar .react-calendar__month-view__weekdays{font-size:.62rem!important;text-transform:uppercase;font-weight:600}
              .compact-calendar .react-calendar__month-view__weekdays__weekday{padding:4px!important}
              .available-date{background-color:${alpha("#2196F3", 0.15)}!important;border-radius:8px!important;font-weight:bold!important}
              .available-date:hover{background-color:${alpha("#2196F3", 0.25)}!important}
              .available-dot{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background-color:#2196F3}
              .react-calendar__tile--active{background:linear-gradient(135deg,#2196F3,#1976D2)!important;color:white!important}
              .react-calendar__tile--now{background:${alpha("#2196F3", 0.1)}!important}
            `}</style>
            <Calendar onChange={handleDateSelection} value={selectedDate} maxDate={new Date()} next2Label={null} prev2Label={null} className="compact-calendar"
              tileClassName={({ date, view }) => view === "month" && isDateAvailable(date) ? "available-date" : null}
              tileContent={({ date, view }) => view === "month" && isDateAvailable(date) ? <div className="available-dot" /> : null} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1, pt: 1, borderTop: `1px solid ${alpha("#2196F3", 0.1)}` }}>
              <Button size="small" onClick={closeCalendar} sx={{ fontSize: "0.65rem", color: "#2196F3" }}>Close</Button>
            </Box>
          </Popover>
        </Box>
      </Box>

      {/* Scrollable Session Cards */}
      <Box sx={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        px: 1, pt: 0.75, pb: 0.5,
        overscrollBehavior: "contain",
        "&::-webkit-scrollbar": { width: 3 },
        "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        "&::-webkit-scrollbar-thumb": { bgcolor: alpha("#2196F3", 0.2), borderRadius: 2 },
      }}>
        {loadingSessionsByDate && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} sx={{ color: "#2196F3" }} />
          </Box>
        )}
        {!loadingSessionsByDate && allSessions.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CalendarIcon sx={{ fontSize: 36, color: alpha("#2196F3", 0.3), mb: 1 }} />
            <Typography sx={{ fontSize: "0.68rem", color: "text.secondary" }}>No sessions on this date</Typography>
          </Box>
        )}
        {!loadingSessionsByDate && allSessions.length > 0 && (
          <Stack spacing={0} sx={{ gap: "6px" }}>
            {[...allSessions].reverse().map((session, index) => {
              const sessionId = String(session.sessionId || session._id);
              const isSelected = String(selectedSessionId) === sessionId;
              const isLoading = isSelected && isLoadingSession;
              const photoCount = getPhotoCount(session);
              const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);
              const cachedSession = sessionDataCache.current.get(sessionId);
              const displayRemark = session.remark || cachedSession?.remark || null;
              const sessionIsActive = checkIsActive(session);

              return (
                <Card key={sessionId} onClick={() => handleSessionSelect(sessionId)} sx={{
                  cursor: "pointer", position: "relative", overflow: "visible",
                  background: isSelected ? `linear-gradient(135deg,${alpha("#2196F3", 0.08)},${alpha("#1976D2", 0.04)})` : "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: isSelected ? `1.5px solid ${alpha("#2196F3", 0.5)}` : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                  borderRadius: "12px",
                  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                  "&:hover": { borderColor: alpha("#2196F3", 0.6), background: `linear-gradient(135deg,${alpha("#2196F3", 0.05)},${alpha("#1976D2", 0.02)})`, transform: "translateY(-1px) translateX(1px)", boxShadow: `0 4px 12px ${alpha("#2196F3", 0.15)}` },
                  ...(isSelected && { "&::before": { content: '""', position: "absolute", left: 0, top: "20%", height: "60%", width: "3px", background: "linear-gradient(135deg,#2196F3,#1976D2)", borderRadius: "0 4px 4px 0" } }),
                }}>
                  <CardContent sx={{ p: "8px 10px", "&:last-child": { pb: "8px" } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, mb: 0.6 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: "8px", background: isSelected ? "linear-gradient(135deg,#2196F3,#1976D2)" : `linear-gradient(135deg,${alpha("#2196F3", 0.15)},${alpha("#1976D2", 0.08)})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {isLoading ? <CircularProgress size={12} sx={{ color: isSelected ? "white" : "#2196F3" }} /> : <Typography fontWeight={700} sx={{ fontSize: "0.6rem", color: isSelected ? "white" : "#2196F3" }}>{allSessions.length - index}</Typography>}
                      </Box>
                      <Typography fontWeight={700} sx={{ flex: 1, fontSize: "0.65rem", color: isSelected ? "#2196F3" : "text.primary", letterSpacing: "0.3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {displayRemark || `Session #${allSessions.length - index}`}
                      </Typography>
                      {sessionIsActive && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, bgcolor: alpha("#22c55e", 0.12), border: `1px solid ${alpha("#22c55e", 0.35)}`, borderRadius: "10px", px: 0.6, py: 0.2, flexShrink: 0 }}>
                          <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#22c55e", animation: "livePulse 1.4s ease-in-out infinite", "@keyframes livePulse": { "0%,100%": { opacity: 1, transform: "scale(1)" }, "50%": { opacity: 0.4, transform: "scale(0.7)" } } }} />
                          <Typography sx={{ fontSize: "0.48rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.4px" }}>LIVE</Typography>
                        </Box>
                      )}
                      {photoCount > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2, bgcolor: alpha("#FF9800", 0.1), borderRadius: "10px", px: 0.5, py: 0.2, border: `1px solid ${alpha("#FF9800", 0.2)}`, flexShrink: 0 }}>
                          <PhotoIcon sx={{ fontSize: 9, color: "#FF9800" }} />
                          <Typography sx={{ fontSize: "0.5rem", fontWeight: 600, color: "#FF9800" }}>{photoCount}</Typography>
                        </Box>
                      )}
                    </Box>

                    {/* <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: "4px 6px", bgcolor: alpha("#FF9800", 0.05), borderRadius: "7px", border: `1px solid ${alpha("#FF9800", 0.1)}` }}>
                          <TimerIcon sx={{ fontSize: 11, color: "#FF9800", flexShrink: 0 }} />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="caption" sx={{ fontSize: "0.42rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px", display: "block" }}>Duration</Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.58rem", lineHeight: 1.2, color: "#FF9800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{fmtDuration(stats.duration)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: "4px 6px", bgcolor: alpha("#2196F3", 0.05), borderRadius: "7px", border: `1px solid ${alpha("#2196F3", 0.1)}` }}>
                          <StraightenIcon sx={{ fontSize: 11, color: "#2196F3", flexShrink: 0 }} />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="caption" sx={{ fontSize: "0.42rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px", display: "block" }}>Distance</Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.58rem", lineHeight: 1.2, color: "#2196F3" }}>{fmtDist(stats.distance)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid> */}
                    <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: "4px 6px", bgcolor: alpha("#FF9800", 0.05), borderRadius: "7px", border: `1px solid ${alpha("#FF9800", 0.1)}` }}>
                          <TimerIcon sx={{ fontSize: 11, color: "#FF9800", flexShrink: 0 }} />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="caption" sx={{ fontSize: "0.42rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px", display: "block" }}>Duration</Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.58rem", lineHeight: 1.2, color: "#FF9800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sessionIsActive ? "Live" : fmtDuration(stats.duration)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: "4px 6px", bgcolor: alpha("#2196F3", 0.05), borderRadius: "7px", border: `1px solid ${alpha("#2196F3", 0.1)}` }}>
                          <StraightenIcon sx={{ fontSize: 11, color: "#2196F3", flexShrink: 0 }} />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="caption" sx={{ fontSize: "0.42rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px", display: "block" }}>Distance</Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.58rem", lineHeight: 1.2, color: "#2196F3" }}>{sessionIsActive ? "Updating..." : fmtDist(stats.distance)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 0.4, borderColor: alpha(theme.palette.divider, 0.25) }} />

                    <Grid container spacing={0.4}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                          <Box sx={{ width: 18, height: 18, borderRadius: "5px", bgcolor: alpha("#22c55e", 0.1), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.42rem", color: "text.secondary", fontWeight: 500 }}>START</Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.52rem", lineHeight: 1.2, color: "#22c55e" }}>{fmtTime(stats.startTime)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                          <Box sx={{ width: 18, height: 18, borderRadius: "5px", bgcolor: alpha("#ef4444", 0.1), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.42rem", color: "text.secondary", fontWeight: 500 }}>END</Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.52rem", lineHeight: 1.2, color: "#ef4444" }}>{fmtTime(stats.endTime)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>

      {/* Fixed Photo Carousel */}
      {renderPhotoCarousel()}
    </Box>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Box
      ref={rootRef}
      sx={{
        height: `calc(100vh - ${rootTop}px)`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      {/* AppBar */}
      <AppBar position="static" sx={{ flexShrink: 0, bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.06)", zIndex: 1200 }}>
        <Toolbar variant="dense" disableGutters sx={{ height: 48, minHeight: "48px !important", px: { xs: 1, sm: 2 } }}>
          <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
            <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </IconButton>
          <Box sx={{ flex: 1, ml: 1, minWidth: 0 }}>
            <Typography noWrap sx={{ fontSize: { xs: "0.68rem", sm: "0.82rem" }, color: "#2196F3", fontWeight: 600 }}>
              {selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </Typography>
          </Box>
          <IconButton onClick={() => setIsDarkMode(!isDarkMode)} sx={{ color: "#2196F3", mr: 1, bgcolor: alpha("#2196F3", 0.08) }}>
            {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
          </IconButton>
          {isMobile && (
            <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer}
              sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
              {allSessions.length}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Map column */}
        <Box sx={{ flex: 1, position: "relative", minWidth: 0, minHeight: 0, overflow: "hidden" }}>
          <div ref={mapRef} style={{ position: "absolute", inset: 0, backgroundColor: "#f0f0f0" }} />

          {isLoadingSession && (
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
              <CircularProgress size={40} sx={{ color: "#2196F3" }} />
            </Box>
          )}

          {selectedSession && hasLocations && !isSelectedSessionActive && (
            <Paper sx={{
              position: "absolute", top: 12, left: 50,
              p: "6px 8px", borderRadius: 2, zIndex: 500, boxShadow: 2,
              backdropFilter: "blur(10px)", bgcolor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", flexDirection: "column", gap: 0.5,
              maxWidth: "calc(100% - 120px)", minWidth: 0,
            }}>
              {/* Session title */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 0 }}>
                <PinDropIcon sx={{ fontSize: 12, color: "#2196F3", flexShrink: 0 }} />
                <Typography sx={{ fontSize: "0.6rem", color: "#2196F3", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {selectedSession.remark || "Session"}
                </Typography>
              </Box>

              {/* 2x2 grid */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.4 }}>
                {[
                  { icon: <TimerIcon sx={{ fontSize: 9, color: "#FF9800" }} />, label: fmtDuration(totalDuration), color: "#FF9800", bg: alpha("#FF9800", 0.15) },
                  { icon: <StraightenIcon sx={{ fontSize: 9, color: "#2196F3" }} />, label: fmtDist(totalDistance), color: "#2196F3", bg: alpha("#2196F3", 0.15) },
                  { icon: <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />, label: fmtTime(startTime), color: "#22c55e", bg: alpha("#22c55e", 0.15) },
                  { icon: <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />, label: fmtTime(endTime), color: "#ef4444", bg: alpha("#ef4444", 0.15) },
                ].map((chip, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.3, bgcolor: chip.bg, px: 0.6, py: 0.25, borderRadius: "6px", minWidth: 0 }}>
                    {chip.icon}
                    <Typography sx={{ fontSize: "0.54rem", fontWeight: 600, color: chip.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {chip.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}

          {isSelectedSessionActive && (
            <Zoom in={isSelectedSessionActive}>
              <Box sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 600, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.5 }}>
                <Tooltip title={lastRefreshed ? `Last updated: ${lastRefreshed.toLocaleTimeString()}` : "Refresh live location"} placement="left">
                  <Box onClick={handleRefreshLiveLocation} sx={{
                    display: "flex", alignItems: "center", gap: 1,
                    bgcolor: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
                    borderRadius: "24px", px: 1.5, py: 0.75,
                    boxShadow: `0 4px 16px ${alpha("#22c55e", 0.35)}`,
                    border: `1.5px solid ${alpha("#22c55e", 0.4)}`,
                    cursor: isRefreshing ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": !isRefreshing ? { bgcolor: "rgba(255,255,255,1)", boxShadow: `0 6px 20px ${alpha("#22c55e", 0.5)}`, transform: "translateY(-1px)" } : {},
                  }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#22c55e", flexShrink: 0, animation: "liveDot 1.4s ease-in-out infinite", "@keyframes liveDot": { "0%,100%": { opacity: 1, transform: "scale(1)" }, "50%": { opacity: 0.35, transform: "scale(0.65)" } } }} />
                    <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#15803d", letterSpacing: "0.3px", userSelect: "none" }}>LIVE</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", bgcolor: alpha("#22c55e", 0.12), flexShrink: 0 }}>
                      {isRefreshing ? <CircularProgress size={13} sx={{ color: "#22c55e" }} /> : (
                        <RefreshIcon sx={{ fontSize: 14, color: "#22c55e", transition: "transform 0.6s ease", transform: refreshSpinning ? "rotate(360deg)" : "rotate(0deg)" }} />
                      )}
                    </Box>
                  </Box>
                </Tooltip>
                {lastRefreshed && (
                  <Typography sx={{ fontSize: "0.5rem", color: alpha("#15803d", 0.8), bgcolor: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", borderRadius: "10px", px: 1, py: 0.2, border: `1px solid ${alpha("#22c55e", 0.2)}` }}>
                    Updated {lastRefreshed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </Typography>
                )}
              </Box>
            </Zoom>
          )}

          {/* Stylish Map Legend */}
          <Paper elevation={0} sx={{
            position: "absolute", bottom: 20, left: 20,
            p: 1.5, borderRadius: "16px", zIndex: 500,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            backdropFilter: "blur(16px)",
            bgcolor: isDarkMode ? "rgba(22, 22, 22, 0.75)" : "rgba(255, 255, 255, 0.8)",
            border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"}`,
            display: "flex", flexDirection: "column", gap: isLegendOpen ? 1.2 : 0,
            minWidth: 160,
            transition: "all 0.3s ease",
            "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            }
          }}>
            <Box 
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              sx={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, 
                mb: isLegendOpen ? 0.5 : 0, 
                borderBottom: isLegendOpen ? `1px solid ${alpha(isDarkMode ? '#fff' : '#000', 0.1)}` : 'none', 
                pb: isLegendOpen ? 1 : 0, 
                cursor: 'pointer' 
              }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: alpha('#2196F3', 0.15) }}>
                        <PinDropIcon sx={{ fontSize: 14, color: "#2196F3" }} />
                    </Box>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: isDarkMode ? "#fff" : "text.primary", letterSpacing: "0.3px", textTransform: "uppercase" }}>
                      Map Legend
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', color: isDarkMode ? "#aaa" : "text.secondary" }}>
                    <NavigateNextIcon sx={{ fontSize: 18, transform: isLegendOpen ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform 0.3s ease" }} />
                </Box>
            </Box>
            
            {isLegendOpen && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 18, height: 4, bgcolor: '#3553ea', borderRadius: 2, boxShadow: "0 1px 3px rgba(53, 83, 234, 0.4)" }} />
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Online Route</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 18, height: 4, bgcolor: '#ef4444', borderRadius: 2, boxShadow: "0 1px 3px rgba(239, 68, 68, 0.4)" }} />
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Offline Route</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 18, height: 18, bgcolor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <span style={{ fontSize: '9px' }}>🚀</span>
                  </Box>
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Start Point</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 18, height: 18, bgcolor: '#FF9800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <span style={{ fontSize: '9px' }}>📸</span>
                  </Box>
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Route Photo</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 18, height: 18, bgcolor: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <span style={{ fontSize: '9px' }}>🏁</span>
                  </Box>
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>End Point</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#22c55e", boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)", animation: "liveDot 1.4s ease-in-out infinite", "@keyframes liveDot": { "0%,100%": { opacity: 1, transform: "scale(1)" }, "50%": { opacity: 0.35, transform: "scale(0.65)" } } }} />
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary", ml: 0.2 }}>Live Tracking</Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Right column: session list (desktop) */}
        {!isMobile && (
          <Box sx={{
            width: { md: 280, lg: 300 },
            flexShrink: 0,
            borderLeft: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: 0,
          }}>
            {renderSessionList()}
          </Box>
        )}
      </Box>

      {/* Mobile drawer */}
      {isMobile && (
        <>
          <Fab color="primary" sx={{ position: "fixed", bottom: 24, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
            <MenuIcon />
          </Fab>
          <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: { ...drawerPaperSx, display: "flex", flexDirection: "column" } }}>
            <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.85rem" }}>Sessions</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>
                  {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </Typography>
              </Box>
              <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
            </Box>
            <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>{renderSessionList()}</Box>
          </Drawer>
        </>
      )}

      {renderPhotoModal()}
    </Box>
  );
};

export default Locations;