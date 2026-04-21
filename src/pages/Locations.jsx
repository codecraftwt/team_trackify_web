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
  if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [], remark: null };

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
    remark: session.remark || null,
  };
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
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
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
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
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
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
  });

const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
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

const makeEndWithPhotoIcon = (photoUrl, time, size = 34) =>
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
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [sessionPhotos, setSessionPhotos] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylines = useRef([]);
  const markers = useRef([]);
  const markerRefs = useRef(new Map());
  const fetchedSessions = useRef(new Set());
  const sessionDataCache = useRef(new Map());

  const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
  const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);
  const drawerOpen = activeDrawer === "sessions";
  const drawerPaperSx = {
    width: { xs: "85%", sm: 300 },
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  };

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

  const buildSessionPhotos = useCallback((session) => {
    if (!session) return [];
    const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
    const result = [];
    const seenUrls = new Set();
    const seenLatLng = new Set();
    const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

    if (sp && sp.photo && !seenUrls.has(sp.photo)) {
      const latLngKey = getLatLngKey(sp.lat, sp.lng);
      if (!seenLatLng.has(latLngKey)) {
        seenUrls.add(sp.photo);
        seenLatLng.add(latLngKey);
        result.push({ key: "start", url: sp.photo, timestamp: sp.timestamp, address: sp.address, lat: sp.lat, lng: sp.lng, type: "start" });
      }
    }

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
      result.push({ key: `photo_${idx}`, idx, url: photo.url, timestamp: photo.timestamp, address: photo.address || "Address not available", lat: pLat, lng: pLng, type: "route" });
    });

    if (ep && ep.photo && !seenUrls.has(ep.photo)) {
      const latLngKey = getLatLngKey(ep.lat, ep.lng);
      if (!(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng)) && !seenLatLng.has(latLngKey)) {
        seenUrls.add(ep.photo);
        seenLatLng.add(latLngKey);
        result.push({ key: "end", url: ep.photo, timestamp: ep.timestamp, address: ep.address, lat: ep.lat, lng: ep.lng, type: "end" });
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

  // Init sessions — also try to pull remark from sessionDataCache if already fetched
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

  // Watch Redux sessionDetails — update remark in allSessions list too
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

      setAllSessions((prev) =>
        prev.map((s) =>
          String(s.sessionId || s._id) === id
            ? { ...s, remark: sessionDetails.remark || s.remark }
            : s
        )
      );

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

  // Custom popup styling with smaller size
  const createCustomPopup = (content, isSmall = false) => {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = content;
    popupDiv.style.minWidth = isSmall ? '180px' : '220px';
    popupDiv.style.maxWidth = isSmall ? '240px' : '280px';
    popupDiv.style.fontSize = '11px';
    return popupDiv;
  };

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

    if (startPoint && hasValidCoordinates(startPoint)) {
      const popupContent = `<div style="min-width:180px;max-width:240px;">
        <div style="background:#22c55e;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px">🚀</span><b style="font-size:12px">START POINT</b></div>
        </div>
        <div style="font-size:11px"><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
        <div style="font-size:11px"><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
        <div style="margin-top:6px;border-top:1px solid #ddd;padding-top:6px;">
          <b style="font-size:11px">📸 Start Photo</b><br/>
          <img src="${startPoint.photo}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:4px;" onclick="window.open('${startPoint.photo}','_blank')"/>
        </div>
      </div>`;
      const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34);
      const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
        .bindPopup(popupContent, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("start", m);
    } else if (validLocations.length > 0) {
      const fb = validLocations[0];
      const popupContent = `<div style="min-width:160px;max-width:200px;">
        <div style="background:#22c55e;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🚀</span><b style="font-size:11px">START POINT</b></div>
        </div>
        <div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
        <div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
      </div>`;
      const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
        .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("start", m);
    }

    if (endPoint && hasValidCoordinates(endPoint)) {
      const popupContent = `<div style="min-width:180px;max-width:240px;">
        <div style="background:#ef4444;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px">🏁</span><b style="font-size:12px">END POINT</b></div>
        </div>
        <div style="font-size:11px"><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
        <div style="font-size:11px"><b>Date:</b> ${fmtDate(endPoint.timestamp)}</div>
        <div style="margin-top:6px;border-top:1px solid #ddd;padding-top:6px;">
          <b style="font-size:11px">📸 End Photo</b><br/>
          <img src="${endPoint.photo}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:4px;" onclick="window.open('${endPoint.photo}','_blank')"/>
        </div>
      </div>`;
      const icon = makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 34);
      const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
        .bindPopup(popupContent, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("end", m);
    } else if (validLocations.length > 1) {
      const fb = validLocations[validLocations.length - 1];
      const popupContent = `<div style="min-width:160px;max-width:200px;">
        <div style="background:#ef4444;color:white;padding:5px 7px;border-radius:5px;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px">🏁</span><b style="font-size:11px">END POINT</b></div>
        </div>
        <div style="font-size:10px"><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
        <div style="font-size:10px"><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
        <div style="font-size:10px"><b>Address:</b> ${getAddress(fb)}</div>
      </div>`;
      const m = L.marker([getLat(fb), getLng(fb)], { icon: makeEndIcon("#ef4444", fmtTime(fb.timestamp), false, 28), zIndexOffset: 1000 })
        .bindPopup(popupContent, { maxWidth: 200, minWidth: 160 }).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("end", m);
    }

    if (showPhotos && session.photos && session.photos.length > 0) {
      session.photos.forEach((photo, idx) => {
        if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
        const lat = photo.location.lat || photo.location.latitude;
        const lng = photo.location.lng || photo.location.longitude;
        if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
        if (endPoint && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;
        const popup = `<div style="min-width:180px;max-width:240px;">
          <div style="background:#FF9800;color:white;padding:6px 8px;border-radius:6px;margin-bottom:8px;"><b style="font-size:12px">📸 ROUTE PHOTO</b></div>
          <div style="font-size:11px"><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
          <div style="font-size:11px"><b>Remark:</b> ${photo.remark || "Remark not available"}</div>
          <div style="margin-top:6px;"><img src="${photo.url}" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photo.url}','_blank')"/></div>
        </div>`;
        const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28), zIndexOffset: 950 })
          .bindPopup(popup, { maxWidth: 250, minWidth: 180 }).addTo(mapInstance.current);
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

    // const apiKey = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_APIKEY;
    const googleRoadmap = L.tileLayer(`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`, {
      attribution: "&copy; Google Maps",
      maxZoom: 19,
    });

    const googleSatellite = L.tileLayer(`https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&key=${apiKey}`, {
      attribution: "&copy; Google Satellite",
      maxZoom: 19,
    });

    const googleHybrid = L.tileLayer(`https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey}`, {
      attribution: "&copy; Google Hybrid",
      maxZoom: 19,
    });

    const googleTerrain = L.tileLayer(`https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key=${apiKey}`, {
      attribution: "&copy; Google Terrain",
      maxZoom: 19,
    });

    const baseMaps = {
      "Roadmap": googleRoadmap,
      "Satellite": googleSatellite,
      "Hybrid": googleHybrid,
      "Terrain": googleTerrain
    };

    googleRoadmap.addTo(map);
    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

    mapInstance.current = map;
    setIsMapInitialized(true);
    if (selectedSession) {
      setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
    }
  }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

  useEffect(() => {
    if (mapInstance.current && selectedSession) {
      setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
    }
  }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

  useEffect(() => {
    const onResize = () => {
      if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const tilePane = document.querySelector('.leaflet-tile-pane');
    if (tilePane) {
      tilePane.style.filter = isDarkMode ? "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none";
      tilePane.style.transition = "filter 0.3s ease";
    }
  }, [isDarkMode, isMapInitialized]);

  const getPhotoCount = (session) => {
    if (!session) return 0;
    return session.photos?.length || 0;
  };

  const handlePhotoClick = (photo) => {
    if (!mapInstance.current) return;
    const markerKey = photo.key;
    if (markerRefs.current.has(markerKey)) {
      const m = markerRefs.current.get(markerKey);
      const latLng = m.getLatLng();
      mapInstance.current.setView(latLng, 18, { animate: true, duration: 1.5 });
      setTimeout(() => m.openPopup(), 1500);
      return;
    }
    if (photo.lat && photo.lng) {
      mapInstance.current.setView([photo.lat, photo.lng], 18, { animate: true, duration: 1.5 });
    }
  };

  // ─── Photo Carousel ────────────────────────────────────────────────────────
  const renderPhotoCarousel = () => {
    if (!selectedSession || sessionPhotos.length === 0) return null;
    return (
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
            "&::-webkit-scrollbar": { height: 3 },
            "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 },
            "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2 },
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
                  flexShrink: 0, width: 60, height: 60, borderRadius: 1, overflow: "hidden",
                  cursor: "pointer", border: `1.5px solid ${borderColor}`, position: "relative",
                  transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <img src={photo.url} alt={`Photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <Box sx={{ position: "absolute", top: 2, right: 2, bgcolor: borderColor, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7 }}>
                  {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
                </Box>
                <Typography variant="caption" sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(0,0,0,0.6)", color: "white", fontSize: "7px", textAlign: "center", py: 0.15 }}>
                  {fmtTime(photo.timestamp)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
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
              <IconButton onClick={() => setPhotoModalOpen(false)} sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
                <CloseIcon />
              </IconButton>
              <img src={currentPhoto?.url} alt="Full size" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
              <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
                <NavigateNextIcon />
              </IconButton>
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

  // ── Session List with smaller card size ──────────────────────────────────────────
  // const renderSessionList = () => (
  //   <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
  //     <Box sx={{ p: 1 }}>
  //       <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.7rem", mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
  //         <PinDropIcon sx={{ fontSize: 14, color: "#2196F3" }} />
  //         Sessions ({allSessions.length})
  //         {(selectedDate || metadata?.selectedDate) && (
  //           <Chip label={selectedDate || metadata?.selectedDate} size="small" sx={{ ml: "auto", height: 18, fontSize: "0.5rem", bgcolor: alpha("#2196F3", 0.1), color: "#2196F3" }} />
  //         )}
  //       </Typography>

  //       <Stack spacing={1}>
  //         {allSessions.map((session, index) => {
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
  //                   border: isSelected ? `1.5px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  //                   bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
  //                   transition: "all 0.2s ease",
  //                   "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02), transform: "translateY(-1px)", boxShadow: 1 },
  //                 }}
  //               >
  //                 <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
  //                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
  //                     <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#2196F3", fontSize: "0.7rem", fontWeight: "bold" }}>
  //                       {isLoading ? <CircularProgress size={16} /> : index + 1}
  //                     </Box>
  //                     <Box sx={{ flex: 1 }}>
  //                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem" }}>
  //                         {displayRemark || `Session #${index + 1}`}
  //                       </Typography>
  //                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem", display: "flex", alignItems: "center", gap: 0.5 }}>
  //                         <ScheduleIcon sx={{ fontSize: 9 }} />
  //                         {fmtDateTime(session.startTime || session.stats?.startTime)}
  //                       </Typography>
  //                     </Box>
  //                     {photoCount > 0 && (
  //                       <Chip icon={<PhotoIcon sx={{ fontSize: 11 }} />} label={photoCount} size="small" sx={{ height: 20, fontSize: "0.55rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
  //                     )}
  //                   </Box>

  //                   <Grid container spacing={0.75} sx={{ mb: 0.75 }}>
  //                     <Grid item xs={6}>
  //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
  //                         <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
  //                         <Box>
  //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Duration</Typography>
  //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtDuration(stats.duration)}</Typography>
  //                         </Box>
  //                       </Box>
  //                     </Grid>
  //                     <Grid item xs={6}>
  //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
  //                         <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
  //                         <Box>
  //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Distance</Typography>
  //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtDist(stats.distance)}</Typography>
  //                         </Box>
  //                       </Box>
  //                     </Grid>
  //                   </Grid>

  //                   <Divider sx={{ my: 0.75 }} />

  //                   <Grid container spacing={0.75}>
  //                     <Grid item xs={6}>
  //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
  //                         <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
  //                         <Box>
  //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>Start</Typography>
  //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.55rem", display: "block" }}>{fmtTime(stats.startTime)}</Typography>
  //                         </Box>
  //                       </Box>
  //                     </Grid>
  //                     <Grid item xs={6}>
  //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
  //                         <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
  //                         <Box>
  //                           <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>End</Typography>
  //                           <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.55rem", display: "block" }}>{fmtTime(stats.endTime)}</Typography>
  //                         </Box>
  //                       </Box>
  //                     </Grid>
  //                   </Grid>
  //                 </CardContent>
  //               </Card>
  //             </Zoom>
  //           );
  //         })}
  //       </Stack>
  //     </Box>
  //   </Paper>
  // );
  const renderSessionList = () => (
    <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0, bgcolor: "transparent" }}>
      <Box sx={{ p: 0.75 }}>
        {/* Stylish Header */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
          pb: 0.75,
          borderBottom: `2px solid ${alpha("#2196F3", 0.2)}`,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #2196F3, #1976D2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 2px 8px ${alpha("#2196F3", 0.3)}`
            }}>
              <PinDropIcon sx={{ fontSize: 14, color: "white" }} />
            </Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{
              fontSize: "0.7rem",
              background: `linear-gradient(135deg, #2196F3, #1976D2)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              letterSpacing: "0.5px"
            }}>
              SESSIONS
            </Typography>
            <Chip
              label={allSessions.length}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.55rem",
                fontWeight: 700,
                bgcolor: alpha("#2196F3", 0.15),
                color: "#2196F3",
                borderRadius: "8px"
              }}
            />
          </Box>
          {(selectedDate || metadata?.selectedDate) && (
            <Chip
              label={selectedDate || metadata?.selectedDate}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.5rem",
                fontWeight: 500,
                bgcolor: alpha("#2196F3", 0.1),
                color: "#2196F3",
                borderRadius: "6px",
                border: `1px solid ${alpha("#2196F3", 0.2)}`
              }}
            />
          )}
        </Box>

        <Stack spacing={1}>
          {[...allSessions].reverse().map((session, index) => {
            const sessionId = String(session.sessionId || session._id);
            const isSelected = String(selectedSessionId) === sessionId;
            const isLoading = isSelected && isLoadingSession;
            const photoCount = getPhotoCount(session);
            const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

            const cachedSession = sessionDataCache.current.get(sessionId);
            const displayRemark = session.remark || cachedSession?.remark || null;

            return (
              <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
                <Card
                  onClick={() => handleSessionSelect(sessionId)}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    overflow: "visible",
                    background: isSelected
                      ? `linear-gradient(135deg, ${alpha("#2196F3", 0.08)}, ${alpha("#1976D2", 0.04)})`
                      : "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: isSelected
                      ? `1.5px solid ${alpha("#2196F3", 0.5)}`
                      : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    borderRadius: "12px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: alpha("#2196F3", 0.6),
                      background: `linear-gradient(135deg, ${alpha("#2196F3", 0.05)}, ${alpha("#1976D2", 0.02)})`,
                      transform: "translateY(-2px) translateX(2px)",
                      boxShadow: `0 4px 12px ${alpha("#2196F3", 0.15)}`,
                    },
                    ...(isSelected && {
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "20%",
                        height: "60%",
                        width: "3px",
                        background: `linear-gradient(135deg, #2196F3, #1976D2)`,
                        borderRadius: "0 4px 4px 0",
                      }
                    })
                  }}
                >
                  <CardContent sx={{ p: 0.85, '&:last-child': { pb: 0.85 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, mb: 0.6 }}>
                      {/* Stylish Number Badge */}
                      <Box sx={{
                        width: 26,
                        height: 26,
                        borderRadius: "10px",
                        background: isSelected
                          ? `linear-gradient(135deg, #2196F3, #1976D2)`
                          : `linear-gradient(135deg, ${alpha("#2196F3", 0.15)}, ${alpha("#1976D2", 0.08)})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isSelected ? `0 2px 6px ${alpha("#2196F3", 0.3)}` : "none",
                        transition: "all 0.2s ease"
                      }}>
                        {isLoading ? (
                          <CircularProgress size={14} sx={{ color: isSelected ? "white" : "#2196F3" }} />
                        ) : (
                          <Typography fontWeight={700} sx={{
                            fontSize: "0.65rem",
                            color: isSelected ? "white" : "#2196F3",
                            textShadow: isSelected ? "0 1px 2px rgba(0,0,0,0.1)" : "none"
                          }}>
                            {index + 1}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={700} sx={{
                          fontSize: "0.7rem",
                          color: isSelected ? "#2196F3" : "text.primary",
                          letterSpacing: "0.3px",
                          mb: 0.25
                        }}>
                          {displayRemark || `Session #${index + 1}`}
                        </Typography>
                        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <ScheduleIcon sx={{ fontSize: 8, color: alpha("#2196F3", 0.6) }} />
                        <Typography variant="caption" sx={{ 
                          fontSize: "0.5rem", 
                          color: "text.secondary",
                          fontWeight: 500
                        }}>
                          {fmtDateTime(session.startTime || session.stats?.startTime)}
                        </Typography>
                      </Box> */}
                      </Box>

                      {photoCount > 0 && (
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.25,
                          bgcolor: alpha("#FF9800", 0.1),
                          borderRadius: "12px",
                          px: 0.65,
                          py: 0.3,
                          border: `1px solid ${alpha("#FF9800", 0.2)}`
                        }}>
                          <PhotoIcon sx={{ fontSize: 10, color: "#FF9800" }} />
                          <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#FF9800" }}>
                            {photoCount}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Stats Cards */}
                    <Grid container spacing={0.6} sx={{ mb: 0.6 }}>
                      <Grid item xs={6}>
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.6,
                          p: 0.5,
                          bgcolor: alpha("#FF9800", 0.04),
                          borderRadius: "8px",
                          border: `1px solid ${alpha("#FF9800", 0.08)}`,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha("#FF9800", 0.08),
                            borderColor: alpha("#FF9800", 0.15)
                          }
                        }}>
                          <Box sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "6px",
                            bgcolor: alpha("#FF9800", 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              Duration
                            </Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#FF9800" }}>
                              {fmtDuration(stats.duration)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.6,
                          p: 0.5,
                          bgcolor: alpha("#2196F3", 0.04),
                          borderRadius: "8px",
                          border: `1px solid ${alpha("#2196F3", 0.08)}`,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: alpha("#2196F3", 0.08),
                            borderColor: alpha("#2196F3", 0.15)
                          }
                        }}>
                          <Box sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "6px",
                            bgcolor: alpha("#2196F3", 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              Distance
                            </Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.6rem", lineHeight: 1.2, color: "#2196F3" }}>
                              {fmtDist(stats.distance)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{
                      my: 0.6,
                      borderColor: alpha(theme.palette.divider, 0.3),
                      background: `linear-gradient(90deg, transparent, ${alpha("#2196F3", 0.2)}, transparent)`
                    }} />

                    {/* Start/End Points */}
                    <Grid container spacing={0.6}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <Box sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "6px",
                            bgcolor: alpha("#22c55e", 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>
                              START
                            </Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#22c55e" }}>
                              {fmtTime(stats.startTime)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <Box sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "6px",
                            bgcolor: alpha("#ef4444", 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.45rem", color: "text.secondary", fontWeight: 500 }}>
                              END
                            </Typography>
                            <Typography fontWeight={600} sx={{ fontSize: "0.55rem", lineHeight: 1.2, color: "#ef4444" }}>
                              {fmtTime(stats.endTime)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Selected Session Indicator */}
                    {isSelected && (
                      <Box sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#2196F3",
                        boxShadow: `0 0 0 2px ${alpha("#2196F3", 0.2)}`
                      }} />
                    )}
                  </CardContent>
                </Card>
              </Zoom>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );
  const selectedSessionListItem = allSessions.find(
    (session) => String(session.sessionId || session._id) === String(selectedSessionId)
  );
  const selectedSessionCachedData = selectedSessionId
    ? sessionDataCache.current.get(String(selectedSessionId))
    : null;
  const selectedSessionRemark =
    selectedSession?.remark ||
    selectedSessionListItem?.remark ||
    selectedSessionCachedData?.remark ||
    null;
  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper", overflow: "hidden" }}>
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
          <IconButton onClick={() => setIsDarkMode(!isDarkMode)} sx={{ color: "#2196F3", mr: 1, bgcolor: alpha("#2196F3", 0.1) }}>
            {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
          </IconButton>
          {isMobile && (
            <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
              {allSessions.length}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 0, px: 0, height: "calc(100vh - 48px)", overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "100%", backgroundColor: "#f0f0f0" }} />

            {isLoadingSession && (
              <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
                <CircularProgress size={40} sx={{ color: "#2196F3" }} />
              </Box>
            )}

            {selectedSession && hasLocations && (
              <Paper sx={{ position: "absolute", top: 12, left: 50, p: { xs: 0.75, sm: 1 }, borderRadius: 2, maxWidth: { xs: 180, sm: 220 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255, 255, 255, 0.3)" }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.65rem", sm: "0.7rem" }, mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PinDropIcon sx={{ fontSize: 12 }} />
                  {selectedSessionRemark || "No remark added"}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.75, mb: 0.5 }}>
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
                    <TimerIcon sx={{ fontSize: 10, color: "#FF9800" }} />
                    <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDuration(totalDuration)}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
                    <StraightenIcon sx={{ fontSize: 10, color: "#2196F3" }} />
                    <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{fmtDist(totalDistance)}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <Box sx={{ mt: 0.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                    <StartIcon sx={{ fontSize: 9, color: "#22c55e" }} />
                    <Typography variant="caption" sx={{ color: "#22c55e", fontSize: "0.55rem" }}>Start: {fmtTime(startTime)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <FlagIcon sx={{ fontSize: 9, color: "#ef4444" }} />
                    <Typography variant="caption" sx={{ color: "#ef4444", fontSize: "0.55rem" }}>End: {fmtTime(endTime)}</Typography>
                  </Box>
                </Box>
              </Paper>
            )}

            {renderPhotoCarousel()}
          </Grid>

          {!isMobile && (
            <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}>
              {renderSessionList()}
            </Grid>
          )}
        </Grid>
      </Container>

      {isMobile && (
        <>
          <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
            <MenuIcon />
          </Fab>
          <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
            <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
                {(selectedDate || metadata?.selectedDate) && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>{selectedDate || metadata?.selectedDate}</Typography>
                )}
              </Box>
              <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
            </Box>
            <Box sx={{ height: "calc(100% - 56px)", overflow: "auto" }}>{renderSessionList()}</Box>
          </Drawer>
        </>
      )}

      {renderPhotoModal()}
    </Box>
  );
};

export default Locations;