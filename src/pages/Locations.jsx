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
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon,
//   Image as ImageIcon,
//   Menu as MenuIcon,
//   Photo as PhotoIcon,
//   Info as InfoIcon,
//   Pause as PauseIcon,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material";
// import { getSessionDetails } from "../redux/slices/userSlice";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // ─── Constants ───────────────────────────────────────────────────────────────
// const STOP_CONFIG = {
//   MIN_DURATION: 180000,       // 3 minutes
//   MAX_SPEED_KMH: 2,
//   GROUP_RADIUS_METERS: 50,
// };

// // ─── Pure Helpers (stable, defined outside component) ────────────────────────
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

// const calcSpeed = (p1, p2) => {
//   const dist = calcDistance(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
//   const hrs = (new Date(p2.timestamp) - new Date(p1.timestamp)) / 3_600_000;
//   return hrs <= 0 ? Infinity : dist / 1000 / hrs;
// };

// const detectStops = (locations) => {
//   if (!locations || locations.length < 2) return [];
//   const stops = [];
//   let group = [];
//   let startTime = null;

//   const flush = (endIdx) => {
//     if (group.length < 2) return;
//     const endTime = new Date(locations[endIdx].timestamp);
//     const duration = endTime - startTime;
//     if (duration < STOP_CONFIG.MIN_DURATION) return;

//     const center = group.reduce(
//       (a, p) => { a.lat += p.latitude; a.lng += p.longitude; return a; },
//       { lat: 0, lng: 0 }
//     );
//     center.lat /= group.length;
//     center.lng /= group.length;

//     const images = group
//       .filter((p) => p.photo || p.location_image)
//       .map((p) => ({ url: p.photo || p.location_image, timestamp: p.timestamp }));

//     stops.push({
//       id: `stop-${startTime.getTime()}`,
//       center, startTime, endTime, duration,
//       pointCount: group.length, images, points: group,
//     });
//   };

//   for (let i = 1; i < locations.length; i++) {
//     const prev = locations[i - 1];
//     const curr = locations[i];
//     const speed = calcSpeed(prev, curr);
//     const dist = calcDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);

//     if (speed < STOP_CONFIG.MAX_SPEED_KMH && dist < STOP_CONFIG.GROUP_RADIUS_METERS) {
//       if (group.length === 0) { group.push(prev); startTime = new Date(prev.timestamp); }
//       group.push(curr);
//     } else {
//       flush(i - 1);
//       group = [];
//       startTime = null;
//     }
//   }
//   flush(locations.length - 1);
//   return stops;
// };

// const getImageLocations = (locations) =>
//   locations
//     .filter((l) => l.photo || l.location_image)
//     .map((l, i) => ({
//       id: `img-${i}-${l.timestamp}`,
//       url: l.photo || l.location_image,
//       timestamp: l.timestamp,
//       location: { lat: l.latitude, lng: l.longitude },
//     }));

// // Calculate total distance from locations array
// const calcTotalDistance = (locations) => {
//   if (!locations || locations.length < 2) return 0;
//   let total = 0;
//   for (let i = 1; i < locations.length; i++) {
//     total += calcDistance(
//       locations[i - 1].latitude, locations[i - 1].longitude,
//       locations[i].latitude, locations[i].longitude
//     );
//   }
//   return total; // meters
// };

// const fmtTime = (ts) =>
//   ts
//     ? new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
//     : "N/A";

// const fmtDist = (meters) => {
//   if (!meters) return "0 km";
//   return `${(meters / 1000).toFixed(2)} km`;
// };

// // ─── Marker factories (pure functions, no closures on component state) ────────
// const makeCheckIcon = (type, color, time, hasPhoto, size = 36) => {
//   const icon = type === "checkin" ? "🚀" : "🏁";
//   const label = type === "checkin" ? "START" : "END";
//   return L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 3}px;line-height:1">${icon}</span>
//         <span style="font-size:${size / 6}px;line-height:1;margin-top:1px">${label}</span>
//       </div>
//       <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.9);color:#fff;padding:2px 6px;border-radius:12px;font-size:9px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 24],
//     iconAnchor: [size / 2, size + 12],
//   });
// };

// const makeStopIcon = (stop, size = 40) => {
//   const mins = Math.round(stop.duration / 60000);
//   return L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#FF9800;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 3}px">⏸️</span>
//         <span style="font-size:${size / 6}px;line-height:1;margin-top:1px">STOP</span>
//       </div>
//       <div style="position:absolute;bottom:-24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.9);color:#fff;padding:2px 8px;border-radius:12px;font-size:9px;white-space:nowrap;border:1px solid #FF9800;z-index:1">
//         ${mins} min${stop.images.length > 0 ? ` • ${stop.images.length} 📸` : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 28],
//     iconAnchor: [size / 2, size + 14],
//   });
// };

// const makeImageIcon = (index, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#9C27B0;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:${size / 2}px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;cursor:pointer;">📸</div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:2px 4px;border-radius:8px;font-size:7px;white-space:nowrap;z-index:1">Photo ${index + 1}</div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

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

//   const sessionDetails = useSelector((s) => s.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((s) => s.user?.sessionDetailsLoading);
//   const sessionDetailsError = useSelector((s) => s.user?.sessionDetailsError);

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [allSessions, setAllSessions]           = useState([]);
//   const [selectedSessionId, setSelectedSessionId] = useState(
//     initialSelectedSessionId ? String(initialSelectedSessionId) : null
//   );
//   const [selectedSession, setSelectedSession]   = useState(null);
//   const [stops, setStops]                       = useState([]);
//   const [imageLocations, setImageLocations]     = useState([]);
//   const [totalDistance, setTotalDistance]       = useState(0);
//   const [showStops, setShowStops]               = useState(true);
//   const [showImages, setShowImages]             = useState(true);
//   const [drawerOpen, setDrawerOpen]             = useState(false);
//   const [hasLocations, setHasLocations]         = useState(false);
//   const [fetchingSession, setFetchingSession]   = useState(false);
//   const [isRefreshing, setIsRefreshing]         = useState(false);
//   const [initialLoadDone, setInitialLoadDone]   = useState(true); // Set to true since we already have sessions from props

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef          = useRef(null);
//   const mapInstance     = useRef(null);   // L.Map
//   const polylines       = useRef([]);
//   const markers         = useRef([]);
//   const fetchedSessions = useRef(new Set());
//   // Keep a ref to latest session so map callbacks don't go stale
//   const sessionRef      = useRef(null);
//   const stopsRef        = useRef([]);
//   const imagesRef       = useRef([]);
//   const showStopsRef    = useRef(true);
//   const showImagesRef   = useRef(true);

//   // Sync refs with state
//   useEffect(() => { sessionRef.current    = selectedSession; }, [selectedSession]);
//   useEffect(() => { stopsRef.current      = stops; },          [stops]);
//   useEffect(() => { imagesRef.current     = imageLocations; }, [imageLocations]);
//   useEffect(() => { showStopsRef.current  = showStops; },      [showStops]);
//   useEffect(() => { showImagesRef.current = showImages; },     [showImages]);

//   // ── Init sessions from props ───────────────────────────────────────────────
//   useEffect(() => {
//     if (sessions.length > 0) {
//       setAllSessions(sessions);
//     }
//   }, [sessions]);

//   // ── Process session data ───────────────────────────────────────────────────
//   const processSessionData = useCallback((session) => {
//     if (!session) return;
//     setSelectedSession(session);

//     if (session.locations?.length > 0) {
//       setHasLocations(true);
//       const detectedStops = detectStops(session.locations);
//       const images = getImageLocations(session.locations);
//       const dist = calcTotalDistance(session.locations);
//       setStops(detectedStops);
//       setImageLocations(images);
//       setTotalDistance(dist);
//     } else {
//       setHasLocations(false);
//       setStops([]);
//       setImageLocations([]);
//       setTotalDistance(0);
//     }
//   }, []);

//   // ── Handle session click ───────────────────────────────────────────────────
//   const handleSessionSelect = useCallback(
//     (rawId) => {
//       const sessionId = String(rawId);
//       if (sessionId === String(selectedSessionId)) return;

//       setSelectedSessionId(sessionId);
//       setSelectedSession(null);
//       setHasLocations(false);
//       setStops([]);
//       setImageLocations([]);
//       setTotalDistance(0);

//       // Try to find in allSessions
//       const found = allSessions.find(
//         (s) => String(s.sessionId || s._id) === sessionId
//       );

//       if (found?.locations?.length > 0) {
//         processSessionData(found);
//       } else if (sessionDetails && String(sessionDetails.sessionId) === sessionId) {
//         processSessionData(sessionDetails);
//       }
//       // Otherwise the fetch useEffect below will handle it

//       if (isMobile) setDrawerOpen(false);
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [selectedSessionId, allSessions, sessionDetails, isMobile]
//   );

//   // ── Fetch session details ──────────────────────────────────────────────────
//   useEffect(() => {
//     if (!selectedSessionId) return;

//     // Already have data loaded?
//     if (selectedSession?.locations?.length > 0) return;

//     // Already fetched successfully?
//     if (fetchedSessions.current.has(selectedSessionId)) return;

//     let userId = metadata?.userId;
//     if (!userId) {
//       const s = allSessions.find(
//         (s) => String(s.sessionId || s._id) === selectedSessionId
//       );
//       userId = s?.userId;
//     }
//     if (!userId) return;

//     setFetchingSession(true);
//     dispatch(getSessionDetails({ userId, sessionId: selectedSessionId }))
//       .finally(() => {
//         fetchedSessions.current.add(selectedSessionId);
//         setFetchingSession(false);
//       });
//   }, [selectedSessionId, selectedSession?.locations?.length, allSessions, metadata?.userId, dispatch]);

//   // ── Process Redux session details when they arrive ─────────────────────────
//   useEffect(() => {
//     if (
//       sessionDetails &&
//       String(sessionDetails.sessionId) === String(selectedSessionId)
//     ) {
//       processSessionData(sessionDetails);
//     }
//   }, [sessionDetails, selectedSessionId, processSessionData]);

//   // ── Map: clear helpers ─────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//   };

//   // ── Map: draw session ──────────────────────────────────────────────────────
//   const drawSession = useCallback((session, stopsList, imagesList, showS, showI) => {
//     if (!mapInstance.current || !session?.locations?.length) return;

//     clearMap();

//     const locs = session.locations;
//     const routePoints = locs
//       .map((l) => [parseFloat(l.latitude), parseFloat(l.longitude)])
//       .filter(([a, b]) => !isNaN(a) && !isNaN(b));

//     if (routePoints.length === 0) return;

//     // Route polyline
//     if (routePoints.length > 1) {
//       const pl = L.polyline(routePoints, {
//         color: "#2196F3", weight: 4, opacity: 0.8,
//       }).addTo(mapInstance.current);
//       polylines.current.push(pl);
//     }

//     const checkIn  = locs[0];
//     const checkOut = locs.length > 1 ? locs[locs.length - 1] : null;

//     // START marker
//     const startM = L.marker(
//       [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
//       { icon: makeCheckIcon("checkin", "#22c55e", fmtTime(checkIn.timestamp), !!(checkIn.photo || checkIn.location_image)), zIndexOffset: 1000 }
//     )
//       .bindPopup(`<b style="color:#22c55e">🚀 START</b><br/>Time: ${fmtTime(checkIn.timestamp)}<br/>Address: ${checkIn.address || "N/A"}`)
//       .addTo(mapInstance.current);
//     markers.current.push(startM);

//     // END marker
//     if (checkOut) {
//       const endM = L.marker(
//         [parseFloat(checkOut.latitude), parseFloat(checkOut.longitude)],
//         { icon: makeCheckIcon("checkout", "#ef4444", fmtTime(checkOut.timestamp), !!(checkOut.photo || checkOut.location_image)), zIndexOffset: 1000 }
//       )
//         .bindPopup(`<b style="color:#ef4444">🏁 END</b><br/>Time: ${fmtTime(checkOut.timestamp)}<br/>Address: ${checkOut.address || "N/A"}`)
//         .addTo(mapInstance.current);
//       markers.current.push(endM);
//     }

//     // Stop markers
//     if (showS) {
//       stopsList.forEach((stop) => {
//         let popup = `<div style="min-width:200px"><b style="color:#FF9800">⏸️ STOP</b><br/>
//           Duration: ${Math.round(stop.duration / 60000)} min<br/>
//           From: ${fmtTime(stop.startTime)}<br/>
//           To: ${fmtTime(stop.endTime)}<br/>
//           Points: ${stop.pointCount}`;
//         stop.images.forEach((img) => {
//           popup += `<br/><img src="${img.url}" style="max-width:100%;max-height:80px;border-radius:4px;margin-top:4px"/>`;
//         });
//         popup += `</div>`;
//         const m = L.marker([stop.center.lat, stop.center.lng], { icon: makeStopIcon(stop) })
//           .bindPopup(popup)
//           .addTo(mapInstance.current);
//         markers.current.push(m);
//       });
//     }

//     // Image markers
//     if (showI) {
//       imagesList.forEach((img, idx) => {
//         const m = L.marker([img.location.lat, img.location.lng], { icon: makeImageIcon(idx) })
//           .bindPopup(`<div style="text-align:center"><b style="color:#9C27B0">📸 PHOTO</b><br/><small>${new Date(img.timestamp).toLocaleString()}</small><br/><img src="${img.url}" style="max-width:100%;max-height:150px;border-radius:4px;margin-top:4px"/></div>`)
//           .addTo(mapInstance.current);
//         markers.current.push(m);
//       });
//     }

//     // Fit bounds
//     const allPoints = [...routePoints];
//     if (showS) stopsList.forEach((s) => allPoints.push([s.center.lat, s.center.lng]));
//     if (showI) imagesList.forEach((i) => allPoints.push([i.location.lat, i.location.lng]));

//     if (allPoints.length > 0) {
//       mapInstance.current.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40] });
//     }
//   }, []); // No external deps — uses params only

//   // ── Map: initialize once, update on session change ─────────────────────────
//   useEffect(() => {
//     if (!selectedSession?.locations?.length || !mapRef.current) return;

//     const locs = selectedSession.locations;
//     const first = locs[0];
//     if (!first) return;

//     // Destroy old map
//     if (mapInstance.current) {
//       mapInstance.current.remove();
//       mapInstance.current = null;
//       polylines.current = [];
//       markers.current = [];
//     }

//     const map = L.map(mapRef.current, { zoomControl: true }).setView(
//       [parseFloat(first.latitude), parseFloat(first.longitude)],
//       14
//     );
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       maxZoom: 19,
//     }).addTo(map);
//     mapInstance.current = map;

//     // Draw after tiles settle
//     const t = setTimeout(() => {
//       map.invalidateSize();
//       drawSession(selectedSession, stops, imageLocations, showStops, showImages);
//     }, 250);

//     return () => clearTimeout(t);
//   // Only re-run when the session itself changes (not showStops/showImages)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedSession]);

//   // ── Map: redraw when filters or overlay data change (no re-init) ───────────
//   useEffect(() => {
//     if (!mapInstance.current || !selectedSession?.locations?.length) return;
//     drawSession(selectedSession, stops, imageLocations, showStops, showImages);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [stops, imageLocations, showStops, showImages]);

//   // ── Window resize ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     const onResize = () => mapInstance.current?.invalidateSize();
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

//   // ── Refresh function ───────────────────────────────────────────────────────
//   const handleRefresh = () => {
//     setIsRefreshing(true);
    
//     // Simulate refresh by re-setting the sessions from props
//     setTimeout(() => {
//       if (sessions.length > 0) {
//         setAllSessions([...sessions]);
//       }
//       setIsRefreshing(false);
//     }, 500);
//   };

//   // ─── Session list (render fn, NOT a component — avoids remount) ─────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//       {/* Summary */}
//       {summary && Object.keys(summary).length > 0 && (
//         <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//           <Typography variant="body2" fontWeight={600} color="#2196F3" sx={{ fontSize: "0.75rem" }}>
//             {summary.formattedDate || "Selected Date"}
//           </Typography>
//           <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
//             {[
//               ["Sessions", allSessions.length],
//               ["Stops", stops.length],
//               ["Photos", imageLocations.length],
//               ["Distance", fmtDist(totalDistance)],
//             ].map(([label, val]) => (
//               <Grid item xs={3} key={label}>
//                 <Typography variant="caption" sx={{ fontSize: "0.6rem" }} color="text.secondary">{label}</Typography>
//                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.7rem" }}>{val}</Typography>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {/* Toggles */}
//       <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//         <Stack direction="row" spacing={0.5}>
//           <Chip
//             size="small"
//             label={`Stops (${stops.length})`}
//             onClick={() => setShowStops((v) => !v)}
//             color={showStops ? "warning" : "default"}
//             icon={<PauseIcon />}
//             sx={{ height: 24, fontSize: "0.65rem" }}
//           />
//           <Chip
//             size="small"
//             label={`Photos (${imageLocations.length})`}
//             onClick={() => setShowImages((v) => !v)}
//             color={showImages ? "secondary" : "default"}
//             icon={<PhotoIcon />}
//             sx={{ height: 24, fontSize: "0.65rem" }}
//           />
//         </Stack>
//       </Box>

//       {/* Sessions */}
//       <Box sx={{ p: 1.5 }}>
//         <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.75rem", mb: 1 }}>
//           Sessions ({allSessions.length})
//         </Typography>
//         <Stack spacing={1}>
//           {allSessions.map((session, index) => {
//             const sessionId = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading = isSelected && fetchingSession;

//             // Distance: prefer stats, fallback to live calc
//             const distMeters =
//               session.stats?.totalDistance ??
//               session.totalDistance ??
//               (session.locations ? calcTotalDistance(session.locations) : 0);

//             return (
//               <Card
//                 key={sessionId || index}
//                 onClick={() => handleSessionSelect(sessionId)}
//                 sx={{
//                   cursor: "pointer",
//                   border: isSelected
//                     ? `1.5px solid #2196F3`
//                     : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                   bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//                   transition: "all 0.2s ease",
//                   "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02) },
//                 }}
//               >
//                 <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                     <Box sx={{
//                       width: 24, height: 24, borderRadius: "50%",
//                       bgcolor: "#2196F3", display: "flex", alignItems: "center",
//                       justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: "bold",
//                     }}>
//                       {isLoading
//                         ? <CircularProgress size={14} sx={{ color: "white" }} />
//                         : index + 1}
//                     </Box>
//                     <Box>
//                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem" }}>
//                         Session #{index + 1}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                         {fmtTime(session.startTime)}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Grid container spacing={0.5}>
//                     <Grid item xs={4}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Duration</Typography>
//                       <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
//                         {session.duration ? `${Math.round(session.duration / 60)} min` : "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Locations</Typography>
//                       <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
//                         {session.locationCount || session.locations?.length || 0}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Distance</Typography>
//                       <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
//                         {fmtDist(distMeters)}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Paper>
//   );

//   // ─── Render ──────────────────────────────────────────────────────────────────
//   if (!initialLoadDone && isRefreshing) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
//           <CircularProgress size={40} sx={{ color: "#2196F3", mb: 2 }} />
//           <Typography>Loading sessions…</Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   if (fetchingSession && !selectedSession) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
//           <CircularProgress size={40} sx={{ color: "#2196F3", mb: 2 }} />
//           <Typography>Loading session details…</Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   if (sessionDetailsError) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
//           <InfoIcon sx={{ fontSize: 36, color: "error.main", mb: 1 }} />
//           <Typography color="error">Error loading session data</Typography>
//           <Typography variant="caption" color="text.secondary">{sessionDetailsError}</Typography>
//           <Button variant="contained" size="small" onClick={() => window.history.back()} sx={{ mt: 2 }}>
//             Go Back
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   if (!selectedSession && allSessions.length === 0) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
//           <InfoIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
//           <Typography>No Session Data</Typography>
//           <Button variant="contained" size="small" onClick={() => window.history.back()} sx={{ mt: 1 }}>Go Back</Button>
//         </Paper>
//       </Box>
//     );
//   }

//   const sessionIndex = allSessions.findIndex(
//     (s) => String(s.sessionId || s._id) === String(selectedSessionId)
//   );

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
//       {/* AppBar */}
//       <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: 1 }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3", width: 28, height: 28 }}>
//             <ArrowBackIcon sx={{ fontSize: 16 }} />
//           </IconButton>
//           <Typography sx={{ ml: 1, fontSize: "0.8rem", color: "#2196F3", fontWeight: 600, flex: 1 }}>
//             {summary.formattedDate || "Route Tracking"}
//           </Typography>
          
//           {/* Refresh Button */}
//           <IconButton 
//             onClick={handleRefresh} 
//             disabled={isRefreshing}
//             sx={{ color: "#2196F3", mr: 1 }}
//             size="small"
//           >
//             <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: 18 }} />
//           </IconButton>
          
//           {!isMobile && selectedSession && (
//             <Chip
//               label={`Session ${sessionIndex + 1}`}
//               size="small"
//               sx={{ height: 20, bgcolor: alpha("#2196F3", 0.1), color: "#2196F3", fontSize: "0.6rem" }}
//             />
//           )}
//           {isMobile && (
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<MenuIcon />}
//               onClick={() => setDrawerOpen(true)}
//               sx={{ fontSize: "0.65rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3" }}
//             >
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: "calc(100vh - 48px)" }}>
//           {/* Map */}
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#e0e0e0" }} />

//             {selectedSession && !hasLocations && !fetchingSession && (
//               <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", p: 2, textAlign: "center", zIndex: 1000 }}>
//                 <InfoIcon sx={{ fontSize: 40, color: "#2196F3", mb: 1 }} />
//                 <Typography variant="body2">No location data for this session</Typography>
//               </Paper>
//             )}

//             {fetchingSession && selectedSessionId && !selectedSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {/* Overlay info */}
//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 12, p: 1, borderRadius: 1.5, maxWidth: 240, zIndex: 500 }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: "0.7rem" }}>
//                   Session #{sessionIndex + 1}
//                 </Typography>
//                 {[
//                   { color: "#22c55e", label: "START", ts: selectedSession.locations?.[0]?.timestamp },
//                   { color: "#ef4444", label: "END", ts: selectedSession.locations?.[selectedSession.locations.length - 1]?.timestamp },
//                 ].map(({ color, label, ts }) => (
//                   <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
//                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
//                     <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{label}: {fmtTime(ts)}</Typography>
//                   </Box>
//                 ))}
//                 <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
//                   <Chip size="small" label={`${stops.length} stops`} sx={{ height: 16, fontSize: "0.55rem" }} />
//                   <Chip size="small" label={`${imageLocations.length} photos`} sx={{ height: 16, fontSize: "0.55rem" }} />
//                 </Box>
//                 <Box sx={{ mt: 0.5, pt: 0.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//                   <Typography variant="caption" sx={{ fontSize: "0.55rem", display: "block" }}>
//                     Distance: {fmtDist(totalDistance)}
//                   </Typography>
//                   {selectedSession.stats?.duration && (
//                     <Typography variant="caption" sx={{ fontSize: "0.55rem", display: "block" }}>
//                       Duration: {Math.round(selectedSession.stats.duration / 60)} min
//                     </Typography>
//                   )}
//                 </Box>
//               </Paper>
//             )}
//           </Grid>

//           {/* Desktop sidebar */}
//           {!isMobile && (
//             <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//               {renderSessionList()}
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {/* Mobile FAB + Drawer */}
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
//             PaperProps={{ sx: { width: "80%", maxWidth: 320, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 } }}
//           >
//             <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
//               <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
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
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Menu as MenuIcon,
  Photo as PhotoIcon,
  Info as InfoIcon,
  Pause as PauseIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { getSessionDetails } from "../redux/slices/userSlice";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ─── Constants ───────────────────────────────────────────────────────────────
const STOP_CONFIG = {
  MIN_DURATION: 180000,       // 3 minutes
  MAX_SPEED_KMH: 2,
  GROUP_RADIUS_METERS: 50,
};

// ─── Pure Helpers (stable, defined outside component) ────────────────────────
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

const calcSpeed = (p1, p2) => {
  const dist = calcDistance(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
  const hrs = (new Date(p2.timestamp) - new Date(p1.timestamp)) / 3_600_000;
  return hrs <= 0 ? Infinity : dist / 1000 / hrs;
};

const detectStops = (locations) => {
  if (!locations || locations.length < 2) return [];
  const stops = [];
  let group = [];
  let startTime = null;

  const flush = (endIdx) => {
    if (group.length < 2) return;
    const endTime = new Date(locations[endIdx].timestamp);
    const duration = endTime - startTime;
    if (duration < STOP_CONFIG.MIN_DURATION) return;

    const center = group.reduce(
      (a, p) => { a.lat += p.latitude; a.lng += p.longitude; return a; },
      { lat: 0, lng: 0 }
    );
    center.lat /= group.length;
    center.lng /= group.length;

    const images = group
      .filter((p) => p.photo || p.location_image)
      .map((p) => ({ url: p.photo || p.location_image, timestamp: p.timestamp }));

    stops.push({
      id: `stop-${startTime.getTime()}`,
      center, startTime, endTime, duration,
      pointCount: group.length, images, points: group,
    });
  };

  for (let i = 1; i < locations.length; i++) {
    const prev = locations[i - 1];
    const curr = locations[i];
    const speed = calcSpeed(prev, curr);
    const dist = calcDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);

    if (speed < STOP_CONFIG.MAX_SPEED_KMH && dist < STOP_CONFIG.GROUP_RADIUS_METERS) {
      if (group.length === 0) { group.push(prev); startTime = new Date(prev.timestamp); }
      group.push(curr);
    } else {
      flush(i - 1);
      group = [];
      startTime = null;
    }
  }
  flush(locations.length - 1);
  return stops;
};

const getImageLocations = (locations) =>
  locations
    .filter((l) => l.photo || l.location_image)
    .map((l, i) => ({
      id: `img-${i}-${l.timestamp}`,
      url: l.photo || l.location_image,
      timestamp: l.timestamp,
      location: { lat: l.latitude, lng: l.longitude },
    }));

// Calculate total distance from locations array
const calcTotalDistance = (locations) => {
  if (!locations || locations.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < locations.length; i++) {
    total += calcDistance(
      locations[i - 1].latitude, locations[i - 1].longitude,
      locations[i].latitude, locations[i].longitude
    );
  }
  return total; // meters
};

const fmtTime = (ts) =>
  ts
    ? new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "N/A";

const fmtDist = (meters) => {
  if (!meters) return "0 km";
  return `${(meters / 1000).toFixed(2)} km`;
};

// ─── Marker factories (pure functions, no closures on component state) ────────
const makeCheckIcon = (type, color, time, hasPhoto, size = 36) => {
  const icon = type === "checkin" ? "🚀" : "🏁";
  const label = type === "checkin" ? "START" : "END";
  return L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;">
        <span style="font-size:${size / 3}px;line-height:1">${icon}</span>
        <span style="font-size:${size / 6}px;line-height:1;margin-top:1px">${label}</span>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.9);color:#fff;padding:2px 6px;border-radius:12px;font-size:9px;white-space:nowrap;border:1px solid ${color};z-index:1">
        ${time}${hasPhoto ? " 📸" : ""}
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 24],
    iconAnchor: [size / 2, size + 12],
  });
};

const makeStopIcon = (stop, size = 40) => {
  const mins = Math.round(stop.duration / 60000);
  return L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#FF9800;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;">
        <span style="font-size:${size / 3}px">⏸️</span>
        <span style="font-size:${size / 6}px;line-height:1;margin-top:1px">STOP</span>
      </div>
      <div style="position:absolute;bottom:-24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.9);color:#fff;padding:2px 8px;border-radius:12px;font-size:9px;white-space:nowrap;border:1px solid #FF9800;z-index:1">
        ${mins} min${stop.images.length > 0 ? ` • ${stop.images.length} 📸` : ""}
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 28],
    iconAnchor: [size / 2, size + 14],
  });
};

const makeImageIcon = (index, size = 32) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#9C27B0;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:${size / 2}px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;cursor:pointer;">📸</div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:2px 4px;border-radius:8px;font-size:7px;white-space:nowrap;z-index:1">Photo ${index + 1}</div>
    </div>`,
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
  });

// ─── Main Component ───────────────────────────────────────────────────────────
const Locations = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    sessions = [],
    selectedSessionId: initialSelectedSessionId,
    summary = {},
    metadata = {},
  } = location.state || {};

  const sessionDetails = useSelector((s) => s.user?.sessionDetails);
  const sessionDetailsLoading = useSelector((s) => s.user?.sessionDetailsLoading);
  const sessionDetailsError = useSelector((s) => s.user?.sessionDetailsError);

  // ── State ──────────────────────────────────────────────────────────────────
  const [allSessions, setAllSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(
    initialSelectedSessionId ? String(initialSelectedSessionId) : null
  );
  const [selectedSession, setSelectedSession] = useState(null);
  const [stops, setStops] = useState([]);
  const [imageLocations, setImageLocations] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [showStops, setShowStops] = useState(true);
  const [showImages, setShowImages] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasLocations, setHasLocations] = useState(false);
  const [fetchingSession, setFetchingSession] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sessionDistances, setSessionDistances] = useState({});

  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylines = useRef([]);
  const markers = useRef([]);
  const fetchedSessions = useRef(new Set());
  const sessionRef = useRef(null);
  const stopsRef = useRef([]);
  const imagesRef = useRef([]);
  const showStopsRef = useRef(true);
  const showImagesRef = useRef(true);

  // Sync refs with state
  useEffect(() => { sessionRef.current = selectedSession; }, [selectedSession]);
  useEffect(() => { stopsRef.current = stops; }, [stops]);
  useEffect(() => { imagesRef.current = imageLocations; }, [imageLocations]);
  useEffect(() => { showStopsRef.current = showStops; }, [showStops]);
  useEffect(() => { showImagesRef.current = showImages; }, [showImages]);

  // ── Init sessions from props ───────────────────────────────────────────────
  useEffect(() => {
    if (sessions.length > 0) {
      setAllSessions(sessions);
      
      // Pre-calculate distances for all sessions
      const distances = {};
      sessions.forEach(session => {
        const sessionId = String(session.sessionId || session._id);
        if (session.locations?.length > 0) {
          distances[sessionId] = calcTotalDistance(session.locations);
        }
      });
      setSessionDistances(distances);
    }
  }, [sessions]);

  // ── Process session data ───────────────────────────────────────────────────
  const processSessionData = useCallback((session) => {
    if (!session) return;
    
    setSelectedSession(session);

    const sessionId = String(session.sessionId || session._id);
    
    if (session.locations?.length > 0) {
      setHasLocations(true);
      const detectedStops = detectStops(session.locations);
      const images = getImageLocations(session.locations);
      const dist = calcTotalDistance(session.locations);
      
      setStops(detectedStops);
      setImageLocations(images);
      setTotalDistance(dist);
      
      // Store the calculated distance
      setSessionDistances(prev => ({
        ...prev,
        [sessionId]: dist
      }));
      
      // Update the session in allSessions with the full locations if needed
      setAllSessions(prev => 
        prev.map(s => {
          const sId = String(s.sessionId || s._id);
          if (sId === sessionId && (!s.locations || s.locations.length === 0)) {
            return { ...s, locations: session.locations };
          }
          return s;
        })
      );
    } else {
      setHasLocations(false);
      setStops([]);
      setImageLocations([]);
      setTotalDistance(0);
    }
  }, []);

  // ── Handle session click ───────────────────────────────────────────────────
  const handleSessionSelect = useCallback(
    (rawId) => {
      const sessionId = String(rawId);
      if (sessionId === String(selectedSessionId)) return;

      // Update selected session ID immediately
      setSelectedSessionId(sessionId);

      // Try to find in allSessions
      const found = allSessions.find(
        (s) => String(s.sessionId || s._id) === sessionId
      );

      if (found?.locations?.length > 0) {
        // If we have locations, process immediately
        processSessionData(found);
      } else {
        // Clear current session data but keep the list visible
        setSelectedSession(null);
        setHasLocations(false);
        setStops([]);
        setImageLocations([]);
        setTotalDistance(0);
        
        // Check if we already have session details in Redux
        if (sessionDetails && String(sessionDetails.sessionId) === sessionId) {
          processSessionData(sessionDetails);
        }
        // Otherwise the fetch useEffect will handle it
      }

      if (isMobile) setDrawerOpen(false);
    },
    [selectedSessionId, allSessions, sessionDetails, isMobile, processSessionData]
  );

  // ── Fetch session details ──────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedSessionId) return;

    // Already have data loaded?
    if (selectedSession?.locations?.length > 0) return;

    // Already fetched successfully?
    if (fetchedSessions.current.has(selectedSessionId)) return;

    let userId = metadata?.userId;
    if (!userId) {
      const s = allSessions.find(
        (s) => String(s.sessionId || s._id) === selectedSessionId
      );
      userId = s?.userId;
    }
    if (!userId) return;

    setFetchingSession(true);
    dispatch(getSessionDetails({ userId, sessionId: selectedSessionId }))
      .finally(() => {
        fetchedSessions.current.add(selectedSessionId);
        setFetchingSession(false);
      });
  }, [selectedSessionId, selectedSession?.locations?.length, allSessions, metadata?.userId, dispatch]);

  // ── Process Redux session details when they arrive ─────────────────────────
  useEffect(() => {
    if (
      sessionDetails &&
      String(sessionDetails.sessionId) === String(selectedSessionId)
    ) {
      processSessionData(sessionDetails);
    }
  }, [sessionDetails, selectedSessionId, processSessionData]);

  // ── Map: clear helpers ─────────────────────────────────────────────────────
  const clearMap = () => {
    if (!mapInstance.current) return;
    
    // Remove all layers
    polylines.current.forEach((l) => {
      if (mapInstance.current) mapInstance.current.removeLayer(l);
    });
    markers.current.forEach((m) => {
      if (mapInstance.current) mapInstance.current.removeLayer(m);
    });
    
    // Clear the arrays
    polylines.current = [];
    markers.current = [];
  };

  // ── Map: draw session ──────────────────────────────────────────────────────
  const drawSession = useCallback((session, stopsList, imagesList, showS, showI) => {
    if (!mapInstance.current || !session?.locations?.length) return;

    // Clear existing layers first
    clearMap();

    const locs = session.locations;
    const routePoints = locs
      .map((l) => [parseFloat(l.latitude), parseFloat(l.longitude)])
      .filter(([a, b]) => !isNaN(a) && !isNaN(b));

    if (routePoints.length === 0) return;

    // Route polyline
    if (routePoints.length > 1) {
      const pl = L.polyline(routePoints, {
        color: "#2196F3", 
        weight: 4, 
        opacity: 0.8,
      }).addTo(mapInstance.current);
      polylines.current.push(pl);
    }

    const checkIn = locs[0];
    const checkOut = locs.length > 1 ? locs[locs.length - 1] : null;

    // START marker
    const startM = L.marker(
      [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
      { 
        icon: makeCheckIcon("checkin", "#22c55e", fmtTime(checkIn.timestamp), !!(checkIn.photo || checkIn.location_image)), 
        zIndexOffset: 1000 
      }
    )
      .bindPopup(`<b style="color:#22c55e">🚀 START</b><br/>Time: ${fmtTime(checkIn.timestamp)}<br/>Address: ${checkIn.address || "N/A"}`)
      .addTo(mapInstance.current);
    markers.current.push(startM);

    // END marker
    if (checkOut) {
      const endM = L.marker(
        [parseFloat(checkOut.latitude), parseFloat(checkOut.longitude)],
        { 
          icon: makeCheckIcon("checkout", "#ef4444", fmtTime(checkOut.timestamp), !!(checkOut.photo || checkOut.location_image)), 
          zIndexOffset: 1000 
        }
      )
        .bindPopup(`<b style="color:#ef4444">🏁 END</b><br/>Time: ${fmtTime(checkOut.timestamp)}<br/>Address: ${checkOut.address || "N/A"}`)
        .addTo(mapInstance.current);
      markers.current.push(endM);
    }

    // Stop markers
    if (showS) {
      stopsList.forEach((stop) => {
        let popup = `<div style="min-width:200px"><b style="color:#FF9800">⏸️ STOP</b><br/>
          Duration: ${Math.round(stop.duration / 60000)} min<br/>
          From: ${fmtTime(stop.startTime)}<br/>
          To: ${fmtTime(stop.endTime)}<br/>
          Points: ${stop.pointCount}`;
        stop.images.forEach((img) => {
          popup += `<br/><img src="${img.url}" style="max-width:100%;max-height:80px;border-radius:4px;margin-top:4px"/>`;
        });
        popup += `</div>`;
        const m = L.marker([stop.center.lat, stop.center.lng], { icon: makeStopIcon(stop) })
          .bindPopup(popup)
          .addTo(mapInstance.current);
        markers.current.push(m);
      });
    }

    // Image markers
    if (showI) {
      imagesList.forEach((img, idx) => {
        const m = L.marker([img.location.lat, img.location.lng], { icon: makeImageIcon(idx) })
          .bindPopup(`<div style="text-align:center"><b style="color:#9C27B0">📸 PHOTO</b><br/><small>${new Date(img.timestamp).toLocaleString()}</small><br/><img src="${img.url}" style="max-width:100%;max-height:150px;border-radius:4px;margin-top:4px"/></div>`)
          .addTo(mapInstance.current);
        markers.current.push(m);
      });
    }

    // Fit bounds to show all points
    if (routePoints.length > 0) {
      mapInstance.current.fitBounds(L.latLngBounds(routePoints), { padding: [40, 40] });
    }
  }, []);

  // ── Map: initialize and update when session changes ─────────────────────────
  useEffect(() => {
    if (!selectedSession?.locations?.length || !mapRef.current) return;

    const locs = selectedSession.locations;
    const first = locs[0];
    if (!first) return;

    // If map doesn't exist, create it
    if (!mapInstance.current) {
      const map = L.map(mapRef.current, { 
        zoomControl: true,
        center: [parseFloat(first.latitude), parseFloat(first.longitude)],
        zoom: 14
      });
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      
      mapInstance.current = map;
    }

    // Clear existing layers and draw new session
    const timeoutId = setTimeout(() => {
      if (mapInstance.current) {
        mapInstance.current.invalidateSize();
        drawSession(selectedSession, stops, imageLocations, showStops, showImages);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedSession, stops, imageLocations, showStops, showImages, drawSession]);

  // ── Map: redraw when filters change ───────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !selectedSession?.locations?.length) return;
    
    const timeoutId = setTimeout(() => {
      drawSession(selectedSession, stops, imageLocations, showStops, showImages);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [showStops, showImages, stops, imageLocations, selectedSession, drawSession]);

  // ── Window resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (mapInstance.current) {
        mapInstance.current.invalidateSize();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Cleanup ────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // ── Refresh function ───────────────────────────────────────────────────────
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      if (sessions.length > 0) {
        setAllSessions([...sessions]);
      }
      setIsRefreshing(false);
    }, 500);
  };

  // ─── Session list (render fn) ─────────────────────────────────────────────
  const renderSessionList = () => (
    <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
      {/* Summary */}
      {summary && Object.keys(summary).length > 0 && (
        <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
          <Typography variant="body2" fontWeight={600} color="#2196F3" sx={{ fontSize: "0.75rem" }}>
            {summary.formattedDate || "Selected Date"}
          </Typography>
          <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
            {[
              ["Sessions", allSessions.length],
              ["Stops", stops.length],
              ["Photos", imageLocations.length],
              ["Distance", fmtDist(totalDistance)],
            ].map(([label, val]) => (
              <Grid item xs={3} key={label}>
                <Typography variant="caption" sx={{ fontSize: "0.6rem" }} color="text.secondary">{label}</Typography>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.7rem" }}>{val}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Toggles */}
      <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
        <Stack direction="row" spacing={0.5}>
          <Chip
            size="small"
            label={`Stops (${stops.length})`}
            onClick={() => setShowStops((v) => !v)}
            color={showStops ? "warning" : "default"}
            icon={<PauseIcon />}
            sx={{ height: 24, fontSize: "0.65rem" }}
          />
          <Chip
            size="small"
            label={`Photos (${imageLocations.length})`}
            onClick={() => setShowImages((v) => !v)}
            color={showImages ? "secondary" : "default"}
            icon={<PhotoIcon />}
            sx={{ height: 24, fontSize: "0.65rem" }}
          />
        </Stack>
      </Box>

      {/* Sessions */}
      <Box sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.75rem", mb: 1 }}>
          Sessions ({allSessions.length})
        </Typography>
        <Stack spacing={1}>
          {allSessions.map((session, index) => {
            const sessionId = String(session.sessionId || session._id);
            const isSelected = String(selectedSessionId) === sessionId;
            const isLoading = isSelected && fetchingSession && !selectedSession;

            // Get distance
            let distMeters = sessionDistances[sessionId];
            
            if (!distMeters && session.locations?.length > 0) {
              distMeters = calcTotalDistance(session.locations);
            }
            
            if (!distMeters) {
              distMeters = session.stats?.totalDistance || session.totalDistance || 0;
            }

            return (
              <Card
                key={sessionId || index}
                onClick={() => handleSessionSelect(sessionId)}
                sx={{
                  cursor: "pointer",
                  border: isSelected
                    ? `1.5px solid #2196F3`
                    : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02) },
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Box sx={{
                      width: 24, height: 24, borderRadius: "50%",
                      bgcolor: "#2196F3", display: "flex", alignItems: "center",
                      justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: "bold",
                    }}>
                      {isLoading
                        ? <CircularProgress size={14} sx={{ color: "white" }} />
                        : index + 1}
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem" }}>
                        Session #{index + 1}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                        {fmtTime(session.startTime)}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={0.5}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Duration</Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
                        {session.duration ? `${Math.round(session.duration / 60)} min` : "N/A"}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Locations</Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
                        {session.locationCount || session.locations?.length || 0}
                      </Typography>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Distance</Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
                        {fmtDist(distMeters)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
        <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: 1 }}>
          <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3", width: 28, height: 28 }}>
            <ArrowBackIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Typography sx={{ ml: 1, fontSize: "0.8rem", color: "#2196F3", fontWeight: 600, flex: 1 }}>
            {summary.formattedDate || "Route Tracking"}
          </Typography>
          
          {/* Refresh Button */}
          <IconButton 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            sx={{ color: "#2196F3", mr: 1 }}
            size="small"
          >
            <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: 18 }} />
          </IconButton>
          
          {!isMobile && selectedSession && (
            <Chip
              label={`Session ${allSessions.findIndex(s => String(s.sessionId || s._id) === String(selectedSessionId)) + 1}`}
              size="small"
              sx={{ height: 20, bgcolor: alpha("#2196F3", 0.1), color: "#2196F3", fontSize: "0.6rem" }}
            />
          )}
          {isMobile && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<MenuIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{ fontSize: "0.65rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3" }}
            >
              {allSessions.length}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
        <Grid container sx={{ height: "calc(100vh - 48px)" }}>
          {/* Map */}
          <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#e0e0e0" }} />

            {selectedSession && !hasLocations && !fetchingSession && (
              <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", p: 2, textAlign: "center", zIndex: 1000 }}>
                <InfoIcon sx={{ fontSize: 40, color: "#2196F3", mb: 1 }} />
                <Typography variant="body2">No location data for this session</Typography>
              </Paper>
            )}

            {fetchingSession && selectedSessionId && !selectedSession && (
              <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
                <CircularProgress size={40} sx={{ color: "#2196F3" }} />
              </Box>
            )}

            {/* Overlay info */}
            {selectedSession && hasLocations && (
              <Paper sx={{ position: "absolute", top: 12, left: 50, p: 1, borderRadius: 1.5, maxWidth: 240, zIndex: 500 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: "0.7rem" }}>
                  Session #{allSessions.findIndex(s => String(s.sessionId || s._id) === String(selectedSessionId)) + 1}
                </Typography>
                {[
                  { color: "#22c55e", label: "START", ts: selectedSession.locations?.[0]?.timestamp },
                  { color: "#ef4444", label: "END", ts: selectedSession.locations?.[selectedSession.locations.length - 1]?.timestamp },
                ].map(({ color, label, ts }) => (
                  <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
                    <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{label}: {fmtTime(ts)}</Typography>
                  </Box>
                ))}
                <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                  <Chip size="small" label={`${stops.length} stops`} sx={{ height: 16, fontSize: "0.55rem" }} />
                  <Chip size="small" label={`${imageLocations.length} photos`} sx={{ height: 16, fontSize: "0.55rem" }} />
                </Box>
                <Box sx={{ mt: 0.5, pt: 0.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
                  <Typography variant="caption" sx={{ fontSize: "0.55rem", display: "block" }}>
                    Distance: {fmtDist(totalDistance)}
                  </Typography>
                  {selectedSession.stats?.duration && (
                    <Typography variant="caption" sx={{ fontSize: "0.55rem", display: "block" }}>
                      Duration: {Math.round(selectedSession.stats.duration / 60)} min
                    </Typography>
                  )}
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Desktop sidebar */}
          {!isMobile && (
            <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}>
              {renderSessionList()}
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Mobile FAB + Drawer */}
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
            PaperProps={{ sx: { width: "80%", maxWidth: 320, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 } }}
          >
            <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>Sessions</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
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
