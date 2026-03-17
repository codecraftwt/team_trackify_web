// New All List

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useLocation } from "react-router-dom";
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
//   Divider,
//   Drawer,
//   Fab,
//   Button,
//   Stack,
//   Alert,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon,
//   Route as RouteIcon,
//   Image as ImageIcon,
//   LocationOn as LocationOnIcon,
//   AccessTime as AccessTimeIcon,
//   Menu as MenuIcon,
//   Photo as PhotoIcon,
//   Info as InfoIcon,
//   PlayArrow as PlayArrowIcon,
//   Stop as StopIcon,
//   DirectionsWalk as DirectionsWalkIcon,
// } from "@mui/icons-material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix for default markers in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const leafletMapContainerStyle = {
//   width: "100%",
//   height: "100%",
//   minHeight: "500px",
// };

// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
  
//   // Get data from location state
//   const { 
//     sessions = [], 
//     summary = {}, 
//     metadata = {} 
//   } = location.state || {};
  
//   const [allSessions, setAllSessions] = useState([]);
//   const [selectedSessionId, setSelectedSessionId] = useState(null);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
  
//   const mapRef = useRef(null);
//   const leafletMapInstance = useRef(null);
//   const leafletPolylines = useRef([]);
//   const leafletMarkers = useRef([]);

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Initialize sessions
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       setAllSessions(sessions);
//       // Select first session by default
//       setSelectedSessionId(sessions[0]._id);
//       setSelectedSession(sessions[0]);
//     }
//   }, [sessions]);

//   // Get route points and check-in/out points
//   const getSessionRouteData = useCallback((session) => {
//     if (!session || !session.locations || session.locations.length === 0) {
//       return { 
//         routePoints: [], 
//         checkIn: null, 
//         checkOut: null,
//         hasImages: false 
//       };
//     }
    
//     const locations = session.locations;
    
//     // Get all points for the route line (using ALL locations for accurate path)
//     const routePoints = locations.map(loc => ({
//       lat: parseFloat(loc.latitude),
//       lng: parseFloat(loc.longitude),
//     }));
    
//     // Check-in is first location
//     const checkIn = locations[0];
    
//     // Check-out is last location
//     const checkOut = locations.length > 1 ? locations[locations.length - 1] : null;
    
//     // Check if session has any images
//     const hasImages = locations.some(loc => loc.location_image);
    
//     return {
//       routePoints,
//       checkIn,
//       checkOut,
//       hasImages,
//       totalLocations: locations.length,
//     };
//   }, []);

//   // Handle session selection
//   const handleSessionSelect = (sessionId) => {
//     const session = allSessions.find(s => s._id === sessionId);
//     setSelectedSessionId(sessionId);
//     setSelectedSession(session);
    
//     // Update map for selected session
//     if (leafletMapInstance.current && session) {
//       updateLeafletMap(session);
//     }
//   };

//   // Create custom marker for check-in and check-out (smaller)
//   const createMarker = (type, color, time, locationData) => {
//     const size = isMobile ? 32 : 36; // Smaller markers
//     const icon = type === 'checkin' ? '🚀' : '🏁';
//     const label = type === 'checkin' ? 'IN' : 'OUT'; // Shorter label
//     const hasImage = locationData?.location_image ? '📸' : '';
    
//     return L.divIcon({
//       html: `
//         <div style="
//           position: relative;
//           width: ${size}px;
//           height: ${size}px;
//         ">
//           <!-- Main marker -->
//           <div style="
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: ${color};
//             border-radius: 50%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-weight: bold;
//             font-size: ${size/3.5}px;
//             border: 2px solid white;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//             z-index: 2;
//           ">
//             <span style="font-size: ${size/3}px; line-height: 1;">${icon}</span>
//             <span style="font-size: ${size/6}px; line-height: 1; margin-top: 1px; opacity: 0.9;">${label}</span>
//           </div>
          
//           <!-- Time label -->
//           <div style="
//             position: absolute;
//             bottom: -20px;
//             left: 50%;
//             transform: translateX(-50%);
//             background-color: rgba(0,0,0,0.9);
//             color: white;
//             padding: 2px 6px;
//             border-radius: 12px;
//             font-size: 9px;
//             font-weight: 500;
//             white-space: nowrap;
//             border: 1px solid ${color};
//             box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//             z-index: 1;
//           ">
//             ${time} ${hasImage}
//           </div>
//         </div>
//       `,
//       className: "",
//       iconSize: [size, size + 24],
//       iconAnchor: [size/2, size + 12],
//     });
//   };

//   // Update Leaflet map
//   const updateLeafletMap = useCallback((session) => {
//     if (!leafletMapInstance.current || !session) return;

//     const { routePoints, checkIn, checkOut, totalLocations } = getSessionRouteData(session);
    
//     if (routePoints.length === 0 || !checkIn) return;

//     // Clear existing elements
//     leafletPolylines.current.forEach((line) =>
//       leafletMapInstance.current.removeLayer(line)
//     );
//     leafletMarkers.current.forEach((marker) =>
//       leafletMapInstance.current.removeLayer(marker)
//     );
//     leafletPolylines.current = [];
//     leafletMarkers.current = [];

//     // Use blue color for all route lines
//     const routeColor = '#2196F3';

//     // Add polyline for the route using ALL location points
//     if (routePoints.length > 1) {
//       const polyline = L.polyline(routePoints, {
//         color: routeColor,
//         weight: 4, // Slightly thinner
//         opacity: 0.8,
//         lineJoin: "round",
//         lineCap: "round",
//         smoothFactor: 1,
//       }).addTo(leafletMapInstance.current);
      
//       leafletPolylines.current.push(polyline);

//       // Add direction arrows (smaller)
//       const arrowCount = Math.min(3, routePoints.length - 1); // Fewer arrows
//       for (let i = 1; i <= arrowCount; i++) {
//         const arrowIndex = Math.floor((routePoints.length / (arrowCount + 1)) * i);
//         if (arrowIndex > 0 && arrowIndex < routePoints.length) {
//           const prevPoint = routePoints[arrowIndex - 1];
//           const currPoint = routePoints[arrowIndex];
          
//           if (prevPoint && currPoint) {
//             const angle = Math.atan2(
//               currPoint.lat - prevPoint.lat, 
//               currPoint.lng - prevPoint.lng
//             ) * 180 / Math.PI;
            
//             const arrowIcon = L.divIcon({
//               html: `
//                 <div style="
//                   transform: rotate(${angle}deg);
//                   font-size: 16px;
//                   color: ${routeColor};
//                   text-shadow: 0 1px 2px rgba(0,0,0,0.3);
//                   filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
//                 ">
//                   ▶
//                 </div>
//               `,
//               className: "",
//               iconSize: [16, 16],
//               iconAnchor: [8, 8],
//             });
            
//             const arrowMarker = L.marker([currPoint.lat, currPoint.lng], {
//               icon: arrowIcon,
//               interactive: false,
//             }).addTo(leafletMapInstance.current);
            
//             leafletMarkers.current.push(arrowMarker);
//           }
//         }
//       }
//     }

//     // Format time for markers
//     const formatMarkerTime = (timestamp) => {
//       if (!timestamp) return "";
//       return new Date(timestamp).toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     };

//     // Add check-in marker
//     const checkInMarker = L.marker(
//       [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
//       {
//         icon: createMarker(
//           'checkin', 
//           '#22c55e',
//           formatMarkerTime(checkIn.timestamp || session.checkIn),
//           checkIn
//         ),
//         riseOnHover: true,
//         zIndexOffset: 1000,
//       }
//     ).addTo(leafletMapInstance.current);

//     // Create popup for check-in
//     const checkInPopup = `
//       <div style="min-width: 180px; max-width: 240px; font-size: 11px;">
//         <div style="
//           font-weight: bold; 
//           margin-bottom: 6px; 
//           color: #22c55e;
//           border-bottom: 1px solid ${alpha('#22c55e', 0.3)};
//           padding-bottom: 4px;
//           font-size: 13px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         ">
//           <span>🚀</span> CHECK-IN
//         </div>
        
//         <div style="margin-bottom: 4px;">
//           <strong>Time:</strong> ${formatMarkerTime(checkIn.timestamp || session.checkIn)}
//         </div>
        
//         <div style="margin-bottom: 4px;">
//           <strong>Points:</strong> ${totalLocations}
//         </div>
        
//         ${checkIn.location_image ? `
//           <div style="margin-top: 6px; text-align: center;">
//             <img src="${checkIn.location_image}" 
//                  style="max-width: 100%; max-height: 80px; border-radius: 4px; cursor: pointer;"
//                  onclick="window.open('${checkIn.location_image}', '_blank')"/>
//           </div>
//         ` : ''}
//       </div>
//     `;
    
//     checkInMarker.bindPopup(checkInPopup);
//     leafletMarkers.current.push(checkInMarker);

//     // Add check-out marker if exists
//     if (checkOut) {
//       const checkOutMarker = L.marker(
//         [parseFloat(checkOut.latitude), parseFloat(checkOut.longitude)],
//         {
//           icon: createMarker(
//             'checkout', 
//             '#ef4444',
//             formatMarkerTime(checkOut.timestamp || session.checkOut),
//             checkOut
//           ),
//           riseOnHover: true,
//           zIndexOffset: 1000,
//         }
//       ).addTo(leafletMapInstance.current);

//       // Create popup for check-out
//       const checkOutPopup = `
//         <div style="min-width: 180px; max-width: 240px; font-size: 11px;">
//           <div style="
//             font-weight: bold; 
//             margin-bottom: 6px; 
//             color: #ef4444;
//             border-bottom: 1px solid ${alpha('#ef4444', 0.3)};
//             padding-bottom: 4px;
//             font-size: 13px;
//             display: flex;
//             align-items: center;
//             gap: 4px;
//           ">
//             <span>🏁</span> CHECK-OUT
//           </div>
          
//           <div style="margin-bottom: 4px;">
//             <strong>Time:</strong> ${formatMarkerTime(checkOut.timestamp || session.checkOut)}
//           </div>
          
//           <div style="margin-bottom: 4px;">
//             <strong>Points:</strong> ${totalLocations}
//           </div>
          
//           ${checkOut.location_image ? `
//             <div style="margin-top: 6px; text-align: center;">
//               <img src="${checkOut.location_image}" 
//                    style="max-width: 100%; max-height: 80px; border-radius: 4px; cursor: pointer;"
//                    onclick="window.open('${checkOut.location_image}', '_blank')"/>
//             </div>
//           ` : ''}
//         </div>
//       `;
      
//       checkOutMarker.bindPopup(checkOutPopup);
//       leafletMarkers.current.push(checkOutMarker);
//     }

//     // Fit bounds to show entire route
//     if (routePoints.length > 0) {
//       const bounds = L.latLngBounds(routePoints);
//       leafletMapInstance.current.fitBounds(bounds, { 
//         padding: [40, 40],
//         maxZoom: 17
//       });
//     }
//   }, [isMobile, getSessionRouteData]);

//   // Initialize Leaflet map
//   const initLeafletMap = useCallback(() => {
//     if (!leafletMapInstance.current && mapRef.current && selectedSession) {
//       const { checkIn } = getSessionRouteData(selectedSession);
      
//       if (!checkIn) return;

//       leafletMapInstance.current = L.map(mapRef.current, {
//         zoomControl: true,
//         attributionControl: true,
//       }).setView(
//         [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
//         14
//       );

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 19,
//       }).addTo(leafletMapInstance.current);

//       updateLeafletMap(selectedSession);
//     }
//   }, [selectedSession, getSessionRouteData, updateLeafletMap]);

//   // Initialize map when session changes
//   useEffect(() => {
//     if (selectedSession) {
//       if (!leafletMapInstance.current) {
//         initLeafletMap();
//       } else {
//         updateLeafletMap(selectedSession);
//       }
//     }

//     return () => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.remove();
//         leafletMapInstance.current = null;
//       }
//     };
//   }, [selectedSession, initLeafletMap, updateLeafletMap]);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     return new Date(timestamp).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return "N/A";
//     return new Date(timestamp).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // Session List Component (smaller cards)
//   const SessionList = () => (
//     <Paper
//       elevation={0}
//       sx={{
//         height: '100%',
//         overflow: 'auto',
//         borderRadius: 0,
//         borderRight: { sm: `1px solid ${alpha(theme.palette.divider, 0.5)}` },
//         bgcolor: theme.palette.background.paper,
//       }}
//     >
//       {/* Day Summary - Compact */}
//       {summary && Object.keys(summary).length > 0 && (
//         <Box sx={{ 
//           p: 1.5, 
//           borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//           bgcolor: alpha('#2196F3', 0.03),
//         }}>
//           <Typography variant="body2" fontWeight={600} color="#2196F3" gutterBottom sx={{ fontSize: '0.75rem' }}>
//             {summary.formattedDate || 'Selected Date'}
//           </Typography>
//           <Grid container spacing={0.5}>
//             <Grid item xs={4}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Sessions</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>
//                 {summary.totalSessions || allSessions.length}
//               </Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Distance</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>
//                 {summary.totalDistance?.toFixed(2) || 0} km
//               </Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Photos</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>
//                 {allSessions.reduce((sum, s) => sum + (s.locations?.filter(l => l.location_image).length || 0), 0)}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       )}

//       {/* Sessions List */}
//       <Box sx={{ p: 1.5 }}>
//         <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ fontSize: '0.75rem' }}>
//           Sessions ({allSessions.length})
//         </Typography>
//         <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontSize: '0.6rem' }}>
//           Click to view route
//         </Typography>
        
//         <Stack spacing={1}>
//           {allSessions.map((session, index) => {
//             const isSelected = selectedSessionId === session._id;
//             const { totalLocations, hasImages } = getSessionRouteData(session);
            
//             return (
//               <Card
//                 key={session._id}
//                 onClick={() => handleSessionSelect(session._id)}
//                 sx={{
//                   cursor: 'pointer',
//                   border: isSelected ? `1.5px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                   bgcolor: isSelected ? alpha('#2196F3', 0.03) : 'transparent',
//                   transition: 'all 0.2s',
//                   '&:hover': {
//                     bgcolor: alpha('#2196F3', 0.05),
//                     transform: 'translateY(-1px)',
//                     boxShadow: 1,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <Box
//                       sx={{
//                         width: 24,
//                         height: 24,
//                         borderRadius: '50%',
//                         bgcolor: '#2196F3',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         fontWeight: 'bold',
//                         fontSize: '0.7rem',
//                       }}
//                     >
//                       {index + 1}
//                     </Box>
//                     <Box>
//                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
//                         Session #{index + 1}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
//                         {formatDate(session.checkIn)} • {formatTime(session.checkIn)}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
//                     <Grid item xs={6}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
//                         <PlayArrowIcon sx={{ fontSize: 12, color: '#22c55e' }} />
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
//                           In:
//                         </Typography>
//                       </Box>
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.65rem' }}>
//                         {formatTime(session.checkIn)}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
//                         <StopIcon sx={{ fontSize: 12, color: '#ef4444' }} />
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
//                           Out:
//                         </Typography>
//                       </Box>
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.65rem' }}>
//                         {session.checkOut ? formatTime(session.checkOut) : '—'}
//                       </Typography>
//                     </Grid>
//                   </Grid>

//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
//                     <Chip
//                       size="small"
//                       icon={<DirectionsWalkIcon sx={{ fontSize: 10 }} />}
//                       label={`${totalLocations} pts`}
//                       sx={{ height: 18, fontSize: '0.55rem', '& .MuiChip-icon': { ml: 0.5 } }}
//                     />
//                     {hasImages && (
//                       <Chip
//                         size="small"
//                         icon={<PhotoIcon sx={{ fontSize: 10 }} />}
//                         label={`${session.locations?.filter(l => l.location_image).length || 0} 📸`}
//                         sx={{ height: 18, fontSize: '0.55rem', '& .MuiChip-icon': { ml: 0.5 } }}
//                       />
//                     )}
//                     <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto', fontSize: '0.6rem' }}>
//                       {session.totalDistance?.toFixed(1)} km
//                     </Typography>
//                   </Box>

//                   {/* Route preview */}
//                   <Box sx={{ 
//                     mt: 0.5, 
//                     p: 0.5, 
//                     bgcolor: alpha('#2196F3', 0.03), 
//                     borderRadius: 0.5,
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5,
//                   }}>
//                     <RouteIcon sx={{ fontSize: 12, color: '#2196F3' }} />
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                       Route from start to end
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Paper>
//   );

//   // Mobile drawer for session list
//   const MobileDrawer = () => (
//     <>
//       <Fab
//         color="primary"
//         sx={{
//           position: 'fixed',
//           bottom: 16,
//           right: 16,
//           zIndex: 1000,
//           display: { sm: 'none' },
//           bgcolor: '#2196F3',
//           width: 40,
//           height: 40,
//           '&:hover': {
//             bgcolor: '#1976D2',
//           },
//         }}
//         onClick={() => setDrawerOpen(true)}
//       >
//         <MenuIcon sx={{ fontSize: 20 }} />
//       </Fab>
      
//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             height: '75vh',
//             borderTopLeftRadius: 12,
//             borderTopRightRadius: 12,
//           }
//         }}
//       >
//         <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, position: 'relative' }}>
//           <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '0.85rem' }}>
//             Sessions
//           </Typography>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28 }}
//             onClick={() => setDrawerOpen(false)}
//           >
//             <CloseIcon sx={{ fontSize: 18 }} />
//           </IconButton>
//         </Box>
//         <SessionList />
//       </Drawer>
//     </>
//   );

//   if (allSessions.length === 0) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//           p: { xs: 2, sm: 3 },
//         }}
//       >
//         <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", borderRadius: 2 }}>
//           <InfoIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mb: 1 }} />
//           <Typography variant="body1" gutterBottom sx={{ fontSize: '0.9rem' }}>
//             No Session Data
//           </Typography>
//           <Typography color="text.secondary" sx={{ mb: 1.5, fontSize: '0.75rem' }}>
//             No session data available.
//           </Typography>
//           <Button
//             variant="contained"
//             size="small"
//             onClick={() => window.history.back()}
//             sx={{ bgcolor: '#2196F3', fontSize: '0.7rem', py: 0.5, '&:hover': { bgcolor: '#1976D2' } }}
//           >
//             Go Back
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper }}>
//       <AppBar
//         position="static"
//         sx={{
//           bgcolor: theme.palette.background.paper,
//           color: "text.primary",
//           boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.divider, 0.5),
//         }}
//       >
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
//           <IconButton
//             onClick={() => window.history.back()}
//             sx={{
//               color: '#2196F3',
//               width: { xs: 28, sm: 32 },
//               height: { xs: 28, sm: 32 },
//               "&:hover": { bgcolor: alpha('#2196F3', 0.1) },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//           </IconButton>
//           <Typography 
//             variant="subtitle1" 
//             sx={{ 
//               ml: { xs: 0.5, sm: 1 }, 
//               fontSize: { xs: '0.8rem', sm: '0.9rem' }, 
//               color: '#2196F3', 
//               fontWeight: 600 
//             }}
//           >
//             {summary.formattedDate || 'Route Tracking'}
//           </Typography>
          
//           {selectedSession && (
//             <Chip
//               label={`Session ${allSessions.findIndex(s => s._id === selectedSessionId) + 1}`}
//               size="small"
//               sx={{
//                 ml: 'auto',
//                 height: 20,
//                 bgcolor: alpha('#2196F3', 0.1),
//                 color: '#2196F3',
//                 fontSize: '0.6rem',
//                 '& .MuiChip-label': { px: 1 },
//               }}
//             />
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: { xs: 0, sm: 0 } }}>
//         <Grid container sx={{ height: 'calc(100vh - 48px)' }}>
//           {/* Map Section */}
//           <Grid 
//             item 
//             xs={12} 
//             md={8} 
//             sx={{ 
//               height: '100%',
//               position: 'relative',
//             }}
//           >
//             <div ref={mapRef} style={leafletMapContainerStyle} />
            
//             {/* Route Info Overlay - Smaller */}
//             {selectedSession && (
//               <Paper
//                 elevation={2}
//                 sx={{
//                   position: 'absolute',
//                   top: 12,
//                   left: 12,
//                   p: 1,
//                   borderRadius: 1.5,
//                   bgcolor: alpha(theme.palette.background.paper, 0.95),
//                   backdropFilter: 'blur(4px)',
//                   maxWidth: 240,
//                 }}
//               >
//                 <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: '#2196F3', fontSize: '0.7rem' }}>
//                   Session #{allSessions.findIndex(s => s._id === selectedSessionId) + 1}
//                 </Typography>
                
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
//                   <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
//                   <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
//                     START: {formatTime(selectedSession.checkIn)}
//                   </Typography>
//                 </Box>
                
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
//                   <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
//                   <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
//                     END: {selectedSession.checkOut ? formatTime(selectedSession.checkOut) : '—'}
//                   </Typography>
//                 </Box>
                
//                 <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
//                   <Chip
//                     size="small"
//                     label={`${selectedSession.locations?.length || 0} pts`}
//                     sx={{ height: 16, fontSize: '0.55rem', '& .MuiChip-label': { px: 0.5 } }}
//                   />
//                   <Chip
//                     size="small"
//                     label={`${selectedSession.totalDistance?.toFixed(1) || 0} km`}
//                     sx={{ height: 16, fontSize: '0.55rem', '& .MuiChip-label': { px: 0.5 } }}
//                   />
//                 </Box>

//                 <Box sx={{ 
//                   mt: 0.5, 
//                   pt: 0.5, 
//                   borderTop: `1px solid ${alpha('#2196F3', 0.2)}`,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 0.5,
//                 }}>
//                   <Box sx={{ width: 16, height: 3, bgcolor: '#2196F3', borderRadius: 1 }} />
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                     Blue line = route path
//                   </Typography>
//                 </Box>
//               </Paper>
//             )}
//           </Grid>

//           {/* Session List Section */}
//           {!isMobile && (
//             <Grid 
//               item 
//               md={4} 
//               sx={{ 
//                 height: '100%',
//                 borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//               }}
//             >
//               <SessionList />
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {/* Mobile drawer */}
//       {isMobile && <MobileDrawer />}
//     </Box>
//   );
// };

// export default Locations;






















// Final Live
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
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon,
//   Route as RouteIcon,
//   Image as ImageIcon,
//   LocationOn as LocationOnIcon,
//   AccessTime as AccessTimeIcon,
//   Menu as MenuIcon,
//   Photo as PhotoIcon,
//   Info as InfoIcon,
//   PlayArrow as PlayArrowIcon,
//   Stop as StopIcon,
//   DirectionsWalk as DirectionsWalkIcon,
//   Pause as PauseIcon,
// } from "@mui/icons-material";
// import { getSessionDetails } from "../redux/slices/userSlice";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix for default markers in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const leafletMapContainerStyle = {
//   width: "100%",
//   height: "100%",
//   minHeight: "500px",
//   backgroundColor: "#f0f0f0",
// };

// // Stop detection configuration
// const STOP_CONFIG = {
//   MIN_DURATION: 180000, // 3 minutes in milliseconds
//   MAX_SPEED_KMH: 2, // Speed threshold to consider as stopped (km/h)
//   GROUP_RADIUS_METERS: 50, // Radius to group nearby points
// };

// // Calculate distance between two coordinates in meters (Haversine formula)
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//   const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c; // Distance in meters
// };

// // Calculate speed between two points (km/h)
// const calculateSpeed = (point1, point2) => {
//   const distance = calculateDistance(
//     point1.latitude, point1.longitude,
//     point2.latitude, point2.longitude
//   );
  
//   const time1 = new Date(point1.timestamp).getTime();
//   const time2 = new Date(point2.timestamp).getTime();
//   const durationHours = (time2 - time1) / (1000 * 60 * 60); // Convert to hours
  
//   if (durationHours <= 0) return Infinity;
  
//   return (distance / 1000) / durationHours; // Speed in km/h
// };

// // Detect stops from location points
// const detectStops = (locations) => {
//   if (!locations || locations.length < 2) return [];

//   const stops = [];
//   let currentStopPoints = [];
//   let stopStartTime = null;
  
//   for (let i = 1; i < locations.length; i++) {
//     const prevPoint = locations[i - 1];
//     const currPoint = locations[i];
    
//     const speed = calculateSpeed(prevPoint, currPoint);
//     const distance = calculateDistance(
//       prevPoint.latitude, prevPoint.longitude,
//       currPoint.latitude, currPoint.longitude
//     );
    
//     // If moving slowly, consider as potential stop
//     if (speed < STOP_CONFIG.MAX_SPEED_KMH && distance < STOP_CONFIG.GROUP_RADIUS_METERS) {
//       if (currentStopPoints.length === 0) {
//         // Start of a potential stop
//         currentStopPoints.push(prevPoint);
//         stopStartTime = new Date(prevPoint.timestamp);
//       }
//       currentStopPoints.push(currPoint);
//     } else {
//       // Movement detected, check if we have a valid stop
//       if (currentStopPoints.length > 1) {
//         const stopEndTime = new Date(prevPoint.timestamp);
//         const stopDuration = stopEndTime - stopStartTime;
        
//         if (stopDuration >= STOP_CONFIG.MIN_DURATION) {
//           // Calculate stop center (average of all points)
//           const center = currentStopPoints.reduce(
//             (acc, point) => {
//               acc.lat += point.latitude;
//               acc.lng += point.longitude;
//               return acc;
//             },
//             { lat: 0, lng: 0 }
//           );
          
//           center.lat /= currentStopPoints.length;
//           center.lng /= currentStopPoints.length;
          
//           // Get images taken during stop
//           const stopImages = currentStopPoints
//             .filter(point => point.photo || point.location_image)
//             .map(point => ({
//               url: point.photo || point.location_image,
//               timestamp: point.timestamp,
//               location: { lat: point.latitude, lng: point.longitude }
//             }));
          
//           stops.push({
//             id: `stop-${stopStartTime.getTime()}`,
//             center,
//             startTime: stopStartTime,
//             endTime: stopEndTime,
//             duration: stopDuration,
//             pointCount: currentStopPoints.length,
//             images: stopImages,
//             points: currentStopPoints,
//           });
//         }
//       }
      
//       // Reset current stop
//       currentStopPoints = [];
//       stopStartTime = null;
//     }
//   }
  
//   // Check for stop at the end
//   if (currentStopPoints.length > 1) {
//     const stopEndTime = new Date(locations[locations.length - 1].timestamp);
//     const stopDuration = stopEndTime - stopStartTime;
    
//     if (stopDuration >= STOP_CONFIG.MIN_DURATION) {
//       const center = currentStopPoints.reduce(
//         (acc, point) => {
//           acc.lat += point.latitude;
//           acc.lng += point.longitude;
//           return acc;
//         },
//         { lat: 0, lng: 0 }
//       );
      
//       center.lat /= currentStopPoints.length;
//       center.lng /= currentStopPoints.length;
      
//       const stopImages = currentStopPoints
//         .filter(point => point.photo || point.location_image)
//         .map(point => ({
//           url: point.photo || point.location_image,
//           timestamp: point.timestamp,
//           location: { lat: point.latitude, lng: point.longitude }
//         }));
      
//       stops.push({
//         id: `stop-${stopStartTime.getTime()}`,
//         center,
//         startTime: stopStartTime,
//         endTime: stopEndTime,
//         duration: stopDuration,
//         pointCount: currentStopPoints.length,
//         images: stopImages,
//         points: currentStopPoints,
//       });
//     }
//   }
  
//   return stops;
// };

// // Get all image locations
// const getImageLocations = (locations) => {
//   return locations
//     .filter(loc => loc.photo || loc.location_image)
//     .map((loc, index) => ({
//       id: `img-${index}-${loc.timestamp}`,
//       url: loc.photo || loc.location_image,
//       timestamp: loc.timestamp,
//       location: { lat: loc.latitude, lng: loc.longitude },
//       accuracy: loc.accuracy,
//     }));
// };

// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
  
//   // Get data from location state
//   const { 
//     sessions = [], 
//     selectedSessionId: initialSelectedSessionId,
//     summary = {}, 
//     metadata = {} 
//   } = location.state || {};
  
//   // Redux state for session details
//   const sessionDetails = useSelector((state) => state.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);
//   const sessionDetailsError = useSelector((state) => state.user?.sessionDetailsError);
  
//   const [allSessions, setAllSessions] = useState([]);
//   const [selectedSessionId, setSelectedSessionId] = useState(initialSelectedSessionId || null);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [stops, setStops] = useState([]);
//   const [imageLocations, setImageLocations] = useState([]);
//   const [selectedStop, setSelectedStop] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showStops, setShowStops] = useState(true);
//   const [showImages, setShowImages] = useState(true);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [mapInitialized, setMapInitialized] = useState(false);
//   const [hasLocations, setHasLocations] = useState(false);
//   const [fetchingSession, setFetchingSession] = useState(false);
  
//   const mapRef = useRef(null);
//   const leafletMapInstance = useRef(null);
//   const leafletPolylines = useRef([]);
//   const leafletMarkers = useRef([]);
//   const fetchedSessions = useRef(new Set());

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // Debug logs
//   console.log("Locations component mounted", {
//     sessions,
//     metadata,
//     sessionDetails,
//     selectedSessionId
//   });

//   // Initialize sessions from props
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       console.log("Setting all sessions:", sessions);
//       setAllSessions(sessions);
//     }
//   }, [sessions]);

//   // Fetch session details when selectedSessionId changes
//   useEffect(() => {
//     if (!selectedSessionId || !metadata?.userId) {
//       console.log("Missing selectedSessionId or userId", { selectedSessionId, userId: metadata?.userId });
//       return;
//     }

//     // Check if already fetched
//     if (fetchedSessions.current.has(selectedSessionId)) {
//       console.log("Session already fetched:", selectedSessionId);
//       return;
//     }

//     console.log('Fetching session details for:', {
//       userId: metadata.userId,
//       sessionId: selectedSessionId
//     });

//     setFetchingSession(true);
    
//     dispatch(getSessionDetails({
//       userId: metadata.userId,
//       sessionId: selectedSessionId
//     })).then(() => {
//       fetchedSessions.current.add(selectedSessionId);
//       setFetchingSession(false);
//     }).catch(() => {
//       setFetchingSession(false);
//     });
//   }, [selectedSessionId, metadata?.userId, dispatch]);

//   // Process session data when details are fetched
//   useEffect(() => {
//     if (sessionDetails && sessionDetails.sessionId === selectedSessionId) {
//       console.log('Session details received:', sessionDetails);
//       console.log('Locations count:', sessionDetails.locations?.length);

//       setSelectedSession(sessionDetails);

//       // Check if we have locations
//       if (sessionDetails.locations && sessionDetails.locations.length > 0) {
//         setHasLocations(true);

//         // Detect stops from locations
//         const detectedStops = detectStops(sessionDetails.locations);
//         console.log('Detected stops:', detectedStops.length);
//         setStops(detectedStops);

//         // Get image locations
//         const images = getImageLocations(sessionDetails.locations);
//         console.log('Image locations:', images.length);
//         setImageLocations(images);
//       } else {
//         setHasLocations(false);
//         setStops([]);
//         setImageLocations([]);
//       }
//     }
//   }, [sessionDetails, selectedSessionId]);

//   // Get route points and check-in/out locations
//   const getSessionRouteData = useCallback((session) => {
//     if (!session || !session.locations || session.locations.length === 0) {
//       return {
//         routePoints: [],
//         checkIn: null,
//         checkOut: null,
//       };
//     }

//     const locations = session.locations;

//     // Get all points for the route line
//     const routePoints = locations.map(loc => ({
//       lat: parseFloat(loc.latitude),
//       lng: parseFloat(loc.longitude),
//     })).filter(point => !isNaN(point.lat) && !isNaN(point.lng));

//     // Check-in is first location
//     const checkIn = locations[0];

//     // Check-out is last location
//     const checkOut = locations.length > 1 ? locations[locations.length - 1] : null;

//     return {
//       routePoints,
//       checkIn,
//       checkOut,
//       totalLocations: locations.length,
//     };
//   }, []);

//   // Handle session selection from sidebar
//   const handleSessionSelect = (sessionId) => {
//     if (sessionId === selectedSessionId) return;
    
//     setSelectedSessionId(sessionId);
//     setSelectedStop(null);
//     setSelectedImage(null);
//     setMapInitialized(false);
    
//     // On mobile, close drawer after selection
//     if (isMobile) {
//       setDrawerOpen(false);
//     }

    
//   };

//   // Create marker for check-in/out
//   const createCheckMarker = (type, color, time, locationData) => {
//     const size = isMobile ? 32 : 36;
//     const icon = type === 'checkin' ? '🚀' : '🏁';
//     const label = type === 'checkin' ? 'START' : 'END';
//     const hasImage = (locationData?.photo || locationData?.location_image) ? '📸' : '';

//     return L.divIcon({
//       html: `
//         <div style="
//           position: relative;
//           width: ${size}px;
//           height: ${size}px;
//         ">
//           <div style="
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: ${color};
//             border-radius: 50%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-weight: bold;
//             font-size: ${size/3.5}px;
//             border: 2px solid white;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//             z-index: 2;
//           ">
//             <span style="font-size: ${size/3}px; line-height: 1;">${icon}</span>
//             <span style="font-size: ${size/6}px; line-height: 1; margin-top: 1px;">${label}</span>
//           </div>
//           <div style="
//             position: absolute;
//             bottom: -20px;
//             left: 50%;
//             transform: translateX(-50%);
//             background-color: rgba(0,0,0,0.9);
//             color: white;
//             padding: 2px 6px;
//             border-radius: 12px;
//             font-size: 9px;
//             white-space: nowrap;
//             border: 1px solid ${color};
//             z-index: 1;
//           ">
//             ${time} ${hasImage}
//           </div>
//         </div>
//       `,
//       className: "",
//       iconSize: [size, size + 24],
//       iconAnchor: [size/2, size + 12],
//     });
//   };

//   // Create marker for stop
//   const createStopMarker = (stop, index) => {
//     const size = isMobile ? 36 : 40;
//     const duration = Math.round(stop.duration / 60000); // minutes
//     const imageCount = stop.images.length;

//     return L.divIcon({
//       html: `
//         <div style="
//           position: relative;
//           width: ${size}px;
//           height: ${size}px;
//         ">
//           <div style="
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: #FF9800;
//             border-radius: 50%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-weight: bold;
//             font-size: ${size/3}px;
//             border: 2px solid white;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//             z-index: 2;
//             animation: pulse 2s infinite;
//           ">
//             <span style="font-size: ${size/3}px;">⏸️</span>
//             <span style="font-size: ${size/6}px; line-height: 1; margin-top: 1px;">STOP</span>
//           </div>
//           <div style="
//             position: absolute;
//             bottom: -24px;
//             left: 50%;
//             transform: translateX(-50%);
//             background-color: rgba(0,0,0,0.9);
//             color: white;
//             padding: 2px 8px;
//             border-radius: 12px;
//             font-size: 9px;
//             white-space: nowrap;
//             border: 1px solid #FF9800;
//             z-index: 1;
//           ">
//             ${duration} min ${imageCount > 0 ? `• ${imageCount} 📸` : ''}
//           </div>
//         </div>
//       `,
//       className: "",
//       iconSize: [size, size + 28],
//       iconAnchor: [size/2, size + 14],
//     });
//   };

//   // Create marker for image
//   const createImageMarker = (image, index) => {
//     const size = isMobile ? 28 : 32;

//     return L.divIcon({
//       html: `
//         <div style="
//           position: relative;
//           width: ${size}px;
//           height: ${size}px;
//         ">
//           <div style="
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: #9C27B0;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-size: ${size/2}px;
//             border: 2px solid white;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//             z-index: 2;
//             cursor: pointer;
//           ">
//             📸
//           </div>
//           <div style="
//             position: absolute;
//             bottom: -16px;
//             left: 50%;
//             transform: translateX(-50%);
//             background-color: rgba(0,0,0,0.8);
//             color: white;
//             padding: 2px 4px;
//             border-radius: 8px;
//             font-size: 7px;
//             white-space: nowrap;
//             z-index: 1;
//           ">
//             Photo ${index + 1}
//           </div>
//         </div>
//       `,
//       className: "",
//       iconSize: [size, size + 20],
//       iconAnchor: [size/2, size + 10],
//     });
//   };

//   // Update Leaflet map
//   const updateLeafletMap = useCallback((session, stopsList, imagesList) => {
//     if (!leafletMapInstance.current) {
//       console.log("Map instance not available for update");
//       return;
//     }

//     if (!session) {
//       console.log("No session for map update");
//       return;
//     }

//     const { routePoints, checkIn, checkOut } = getSessionRouteData(session);

//     console.log("Updating map with:", {
//       routePoints: routePoints.length,
//       stops: stopsList.length,
//       images: imagesList.length,
//       checkIn: checkIn ? "yes" : "no"
//     });

//     if (routePoints.length === 0) {
//       console.log("No route points to display");
//       return;
//     }

//     if (!checkIn) {
//       console.log("No check-in point");
//       return;
//     }

//     // Clear existing elements
//     leafletPolylines.current.forEach((line) => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.removeLayer(line);
//       }
//     });
//     leafletMarkers.current.forEach((marker) => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.removeLayer(marker);
//       }
//     });
//     leafletPolylines.current = [];
//     leafletMarkers.current = [];

//     const routeColor = '#2196F3';

//     // Add route polyline
//     if (routePoints.length > 1) {
//       const polyline = L.polyline(routePoints, {
//         color: routeColor,
//         weight: 4,
//         opacity: 0.8,
//         lineJoin: "round",
//         lineCap: "round",
//       }).addTo(leafletMapInstance.current);
//       leafletPolylines.current.push(polyline);
//     }

//     // Format time for markers
//     const formatMarkerTime = (timestamp) => {
//       if (!timestamp) return "";
//       return new Date(timestamp).toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     };

//     // Add check-in marker (first location - START)
//     const checkInMarker = L.marker(
//       [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
//       {
//         icon: createCheckMarker(
//           'checkin',
//           '#22c55e',
//           formatMarkerTime(checkIn.timestamp),
//           checkIn
//         ),
//         riseOnHover: true,
//         zIndexOffset: 1000,
//       }
//     ).addTo(leafletMapInstance.current);

//     checkInMarker.bindPopup(`
//       <div style="min-width: 180px;">
//         <div style="font-weight: bold; color: #22c55e; margin-bottom: 5px;">🚀 START LOCATION</div>
//         <div><strong>Time:</strong> ${formatMarkerTime(checkIn.timestamp)}</div>
//         <div><strong>Address:</strong> ${checkIn.address || 'N/A'}</div>
//         ${(checkIn.photo || checkIn.location_image) ? '<div style="margin-top: 5px;">📸 Has photo</div>' : ''}
//       </div>
//     `);
//     leafletMarkers.current.push(checkInMarker);

//     // Add check-out marker (last location - END)
//     if (checkOut) {
//       const checkOutMarker = L.marker(
//         [parseFloat(checkOut.latitude), parseFloat(checkOut.longitude)],
//         {
//           icon: createCheckMarker(
//             'checkout',
//             '#ef4444',
//             formatMarkerTime(checkOut.timestamp),
//             checkOut
//           ),
//           riseOnHover: true,
//           zIndexOffset: 1000,
//         }
//       ).addTo(leafletMapInstance.current);

//       checkOutMarker.bindPopup(`
//         <div style="min-width: 180px;">
//           <div style="font-weight: bold; color: #ef4444; margin-bottom: 5px;">🏁 END LOCATION</div>
//           <div><strong>Time:</strong> ${formatMarkerTime(checkOut.timestamp)}</div>
//           <div><strong>Address:</strong> ${checkOut.address || 'N/A'}</div>
//           ${(checkOut.photo || checkOut.location_image) ? '<div style="margin-top: 5px;">📸 Has photo</div>' : ''}
//         </div>
//       `);
//       leafletMarkers.current.push(checkOutMarker);
//     }

//     // Add stop markers if enabled
//     if (showStops && stopsList.length > 0) {
//       stopsList.forEach((stop, index) => {
//         const stopMarker = L.marker(
//           [stop.center.lat, stop.center.lng],
//           {
//             icon: createStopMarker(stop, index),
//             riseOnHover: true,
//           }
//         ).addTo(leafletMapInstance.current);

//         // Create popup with stop details and images
//         let popupContent = `
//           <div style="min-width: 200px; max-width: 250px;">
//             <div style="font-weight: bold; color: #FF9800; margin-bottom: 8px;">⏸️ STOP DETECTED</div>
//             <div><strong>Duration:</strong> ${Math.round(stop.duration / 60000)} minutes</div>
//             <div><strong>Start:</strong> ${new Date(stop.startTime).toLocaleTimeString()}</div>
//             <div><strong>End:</strong> ${new Date(stop.endTime).toLocaleTimeString()}</div>
//             <div><strong>Points:</strong> ${stop.pointCount} locations</div>
//         `;

//         if (stop.images.length > 0) {
//           popupContent += `<div style="margin-top: 8px;"><strong>Images:</strong></div>`;
//           stop.images.forEach((img, i) => {
//             popupContent += `
//               <div style="margin-top: 5px; text-align: center;">
//                 <img src="${img.url}"
//                      style="max-width: 100%; max-height: 80px; border-radius: 4px; cursor: pointer;"
//                      onclick="window.open('${img.url}', '_blank')"/>
//               </div>
//             `;
//           });
//         }

//         popupContent += `</div>`;
//         stopMarker.bindPopup(popupContent);

//         stopMarker.on('click', () => {
//           setSelectedStop(stop);
//         });

//         leafletMarkers.current.push(stopMarker);
//       });
//     }

//     // Add image markers if enabled
//     if (showImages && imagesList.length > 0) {
//       imagesList.forEach((image, index) => {
//         const imageMarker = L.marker(
//           [image.location.lat, image.location.lng],
//           {
//             icon: createImageMarker(image, index),
//             riseOnHover: true,
//           }
//         ).addTo(leafletMapInstance.current);

//         imageMarker.bindPopup(`
//           <div style="min-width: 200px; text-align: center;">
//             <div style="font-weight: bold; color: #9C27B0; margin-bottom: 5px;">📸 PHOTO</div>
//             <div><small>${new Date(image.timestamp).toLocaleString()}</small></div>
//             <div style="margin-top: 5px;">
//               <img src="${image.url}"
//                    style="max-width: 100%; max-height: 150px; border-radius: 4px; cursor: pointer;"
//                    onclick="window.open('${image.url}', '_blank')"/>
//             </div>
//           </div>
//         `);

//         imageMarker.on('click', () => {
//           setSelectedImage(image);
//         });

//         leafletMarkers.current.push(imageMarker);
//       });
//     }

//     // Fit bounds to show all points
//     if (routePoints.length > 0) {
//       const bounds = L.latLngBounds(routePoints);

//       // Add stop points to bounds if showing
//       if (showStops && stopsList.length > 0) {
//         stopsList.forEach(stop => {
//           bounds.extend([stop.center.lat, stop.center.lng]);
//         });
//       }

//       // Add image points to bounds if showing
//       if (showImages && imagesList.length > 0) {
//         imagesList.forEach(image => {
//           bounds.extend([image.location.lat, image.location.lng]);
//         });
//       }

//       leafletMapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//       setMapInitialized(true);
//     }
//   }, [isMobile, getSessionRouteData, showStops, showImages, createCheckMarker, createStopMarker, createImageMarker]);

//   // Initialize map
//   const initLeafletMap = useCallback(() => {
//     if (!mapRef.current) {
//       console.log("Map ref not available");
//       return;
//     }

//     if (!selectedSession) {
//       console.log("No session selected for map");
//       return;
//     }

//     if (!selectedSession.locations || selectedSession.locations.length === 0) {
//       console.log("No locations in selected session");
//       setHasLocations(false);
//       return;
//     }

//     const { checkIn } = getSessionRouteData(selectedSession);

//     if (!checkIn) {
//       console.log("No check-in point available");
//       return;
//     }

//     // Clean up existing map instance
//     if (leafletMapInstance.current) {
//       leafletMapInstance.current.remove();
//       leafletMapInstance.current = null;
//     }

//     console.log("Initializing map at:", checkIn.latitude, checkIn.longitude);

//     // Create new map instance
//     leafletMapInstance.current = L.map(mapRef.current, {
//       zoomControl: true,
//       attributionControl: true,
//     }).setView(
//       [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
//       14
//     );

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       maxZoom: 19,
//     }).addTo(leafletMapInstance.current);

//     // Force a resize after initialization
//     setTimeout(() => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.invalidateSize();
//         updateLeafletMap(selectedSession, stops, imageLocations);
//       }
//     }, 200);
//   }, [selectedSession, getSessionRouteData, stops, imageLocations, updateLeafletMap]);

//   // Effect to initialize or update map when session changes
//   useEffect(() => {
//     if (selectedSession && selectedSession.locations && selectedSession.locations.length > 0) {
//       console.log("Session ready for map, initializing...");
//       setHasLocations(true);

//       // Small delay to ensure DOM is ready
//       const timer = setTimeout(() => {
//         initLeafletMap();
//       }, 300);

//       return () => clearTimeout(timer);
//     } else if (selectedSession) {
//       setHasLocations(false);
//     }
//   }, [selectedSession, initLeafletMap]);

//   // Update map when stops/images/filters change
//   useEffect(() => {
//     if (leafletMapInstance.current && selectedSession && hasLocations && mapInitialized) {
//       console.log("Updating map with new data");
//       updateLeafletMap(selectedSession, stops, imageLocations);
//     }
//   }, [stops, imageLocations, showStops, showImages, selectedSession, updateLeafletMap, mapInitialized, hasLocations]);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.invalidateSize();
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.remove();
//         leafletMapInstance.current = null;
//       }
//     };
//   }, []);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     return new Date(timestamp).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatDuration = (ms) => {
//     const minutes = Math.floor(ms / 60000);
//     const seconds = Math.floor((ms % 60000) / 1000);
//     return `${minutes}m ${seconds}s`;
//   };

//   const formatDistance = (meters) => {
//     if (!meters) return "0 km";
//     const km = meters / 1000;
//     return `${km.toFixed(2)} km`;
//   };

//   // Session List Component
//   const SessionList = () => (
//     <Paper elevation={0} sx={{ height: '100%', overflow: 'auto', borderRadius: 0 }}>
//       {/* Summary */}
//       {summary && Object.keys(summary).length > 0 && (
//         <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//           <Typography variant="body2" fontWeight={600} color="#2196F3" sx={{ fontSize: '0.75rem' }}>
//             {summary.formattedDate || 'Selected Date'}
//           </Typography>
//           <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
//             <Grid item xs={3}>
//               <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Sessions</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>{allSessions.length}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Stops</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>{stops.length}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Photos</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>{imageLocations.length}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Distance</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>
//                 {selectedSession?.stats ? formatDistance(selectedSession.stats.totalDistance) : '0 km'}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       )}

//       {/* Filter Toggles */}
//       <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//         <Stack direction="row" spacing={0.5}>
//           <Chip
//             size="small"
//             label={`Stops (${stops.length})`}
//             onClick={() => setShowStops(!showStops)}
//             color={showStops ? "warning" : "default"}
//             icon={<PauseIcon />}
//             sx={{ height: 24, fontSize: '0.65rem' }}
//           />
//           <Chip
//             size="small"
//             label={`Photos (${imageLocations.length})`}
//             onClick={() => setShowImages(!showImages)}
//             color={showImages ? "secondary" : "default"}
//             icon={<PhotoIcon />}
//             sx={{ height: 24, fontSize: '0.65rem' }}
//           />
//         </Stack>
//       </Box>

//       {/* Sessions List */}
//       <Box sx={{ p: 1.5 }}>
//         <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.75rem', mb: 1 }}>
//           Sessions ({allSessions.length})
//         </Typography>

//         <Stack spacing={1}>
//           {allSessions.map((session, index) => {
//             const isSelected = selectedSessionId === (session.sessionId || session._id);
//             const isLoading = isSelected && fetchingSession;

//             return (
//               <Card
//                 key={session.sessionId || session._id || index}
//                 onClick={() => handleSessionSelect(session.sessionId || session._id)}
//                 sx={{
//                   cursor: 'pointer',
//                   border: isSelected ? `1.5px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                   bgcolor: isSelected ? alpha('#2196F3', 0.03) : 'transparent',
//                   opacity: isLoading ? 0.7 : 1,
//                 }}
//               >
//                 <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <Box sx={{
//                       width: 24,
//                       height: 24,
//                       borderRadius: '50%',
//                       bgcolor: isLoading ? alpha('#2196F3', 0.3) : '#2196F3',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: 'white',
//                       fontSize: '0.7rem',
//                       fontWeight: 'bold',
//                     }}>
//                       {isLoading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : index + 1}
//                     </Box>
//                     <Box>
//                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
//                         Session #{index + 1}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
//                         {formatTime(session.startTime)}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Grid container spacing={0.5}>
//                     <Grid item xs={4}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>Duration</Typography>
//                       <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>
//                         {session.duration ? `${Math.round(session.duration / 60)} min` : 'N/A'}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>Locations</Typography>
//                       <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>{session.locationCount || 0}</Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>Distance</Typography>
//                       <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>
//                         {session.totalDistance ? (session.totalDistance / 1000).toFixed(1) : 0} km
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

//   // Mobile drawer
//   const MobileDrawer = () => (
//     <>
//       <Fab
//         color="primary"
//         sx={{
//           position: 'fixed',
//           bottom: 16,
//           right: 16,
//           zIndex: 1000,
//           display: { md: 'none' },
//           bgcolor: '#2196F3',
//           width: 48,
//           height: 48,
//         }}
//         onClick={() => setDrawerOpen(true)}
//       >
//         <MenuIcon />
//       </Fab>

//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: '80%',
//             maxWidth: 320,
//             borderTopLeftRadius: 12,
//             borderBottomLeftRadius: 12,
//           }
//         }}
//       >
//         <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '0.9rem' }}>Sessions</Typography>
//           <IconButton onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
//           <SessionList />
//         </Box>
//       </Drawer>
//     </>
//   );

//   // Loading state
//   if (fetchingSession && !selectedSession) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
//         <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
//           <CircularProgress size={40} sx={{ color: '#2196F3', mb: 2 }} />
//           <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>Loading session details...</Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   // Error state
//   if (sessionDetailsError) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
//         <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
//           <InfoIcon sx={{ fontSize: 36, color: theme.palette.error.main, mb: 1 }} />
//           <Typography variant="body1" sx={{ fontSize: '0.9rem' }} color="error">
//             Error loading session data
//           </Typography>
//           <Typography variant="caption" sx={{ fontSize: '0.7rem' }} color="text.secondary">
//             {sessionDetailsError}
//           </Typography>
//           <Button
//             variant="contained"
//             size="small"
//             onClick={() => window.history.back()}
//             sx={{ mt: 2, fontSize: '0.7rem' }}
//           >
//             Go Back
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   // No session data
//   if (!selectedSession && allSessions.length === 0) {
//     return (
//       <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
//         <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
//           <InfoIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mb: 1 }} />
//           <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>No Session Data</Typography>
//           <Button variant="contained" size="small" onClick={() => window.history.back()} sx={{ mt: 1, fontSize: '0.7rem' }}>
//             Go Back
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper }}>
//       <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: '0 1px 5px rgba(0,0,0,0.05)' }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: 1 }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: '#2196F3', width: 28, height: 28 }}>
//             <ArrowBackIcon sx={{ fontSize: 16 }} />
//           </IconButton>
//           <Typography sx={{ ml: 1, fontSize: '0.8rem', color: '#2196F3', fontWeight: 600, flex: 1 }}>
//             {summary.formattedDate || 'Route Tracking'}
//           </Typography>
//           {selectedSession && !isMobile && (
//             <Chip
//               label={`Session ${allSessions.findIndex(s => (s.sessionId || s._id) === selectedSessionId) + 1}`}
//               size="small"
//               sx={{ height: 20, bgcolor: alpha('#2196F3', 0.1), color: '#2196F3', fontSize: '0.6rem' }}
//             />
//           )}
//           {isMobile && (
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<MenuIcon />}
//               onClick={() => setDrawerOpen(true)}
//               sx={{
//                 fontSize: '0.65rem',
//                 borderColor: alpha('#2196F3', 0.3),
//                 color: '#2196F3',
//               }}
//             >
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: 'calc(100vh - 48px)' }}>
//           <Grid item xs={12} md={8} sx={{ height: '100%', position: 'relative' }}>
//             {/* Map container */}
//             <div
//               ref={mapRef}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 minHeight: "500px",
//                 backgroundColor: "#e0e0e0",
//               }}
//             />

//             {/* Show message if no locations */}
//             {selectedSession && !hasLocations && (
//               <Paper sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 p: 2,
//                 textAlign: 'center',
//                 zIndex: 1000,
//                 maxWidth: '80%',
//               }}>
//                 <InfoIcon sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
//                 <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
//                   No location data available for this session
//                 </Typography>
//               </Paper>
//             )}

//             {/* Info Overlay */}
//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: 'absolute', top: 12, left: 12, p: 1, borderRadius: 1.5, maxWidth: 240, zIndex: 500 }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: '#2196F3', fontSize: '0.7rem' }}>
//                   Session #{allSessions.findIndex(s => (s.sessionId || s._id) === selectedSessionId) + 1}
//                 </Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
//                   <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
//                   <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
//                     START: {selectedSession.locations?.[0] ? formatTime(selectedSession.locations[0].timestamp) : 'N/A'}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                   <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
//                   <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
//                     END: {selectedSession.locations?.length > 1 ?
//                       formatTime(selectedSession.locations[selectedSession.locations.length - 1].timestamp) : 'N/A'}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
//                   <Chip size="small" label={`${stops.length} stops`} sx={{ height: 16, fontSize: '0.55rem' }} />
//                   <Chip size="small" label={`${imageLocations.length} photos`} sx={{ height: 16, fontSize: '0.55rem' }} />
//                 </Box>
//                 {selectedSession.stats && (
//                   <Box sx={{ mt: 0.5, pt: 0.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//                     <Typography variant="caption" sx={{ fontSize: '0.55rem', display: 'block' }}>
//                       Distance: {formatDistance(selectedSession.stats.totalDistance)}
//                     </Typography>
//                     <Typography variant="caption" sx={{ fontSize: '0.55rem', display: 'block' }}>
//                       Duration: {Math.round(selectedSession.stats.duration / 60)} min
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             )}
//           </Grid>

//           {/* Desktop Sidebar */}
//           {!isMobile && (
//             <Grid item md={4} sx={{ height: '100%', borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//               <SessionList />
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {/* Mobile Drawer */}
//       {isMobile && <MobileDrawer />}
//     </Box>
//   );
// };

// export default Locations;












<<<<<<< HEAD
=======













//////List 

>>>>>>> 09b59629d0f2b7c7900044a85b685cb5107949cd
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
//     if (sessions.length > 0) setAllSessions(sessions);
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
//   }, [selectedSessionId]); // Only re-run when sessionId changes

//   // ── Process Redux session details when they arrive ─────────────────────────
//   useEffect(() => {
//     if (
//       sessionDetails &&
//       String(sessionDetails.sessionId) === String(selectedSessionId)
//     ) {
//       processSessionData(sessionDetails);
//     }
//   }, [sessionDetails]);

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




<<<<<<< HEAD




// Refresh auto


=======
>>>>>>> 09b59629d0f2b7c7900044a85b685cb5107949cd
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
  const [allSessions, setAllSessions]           = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(
    initialSelectedSessionId ? String(initialSelectedSessionId) : null
  );
  const [selectedSession, setSelectedSession]   = useState(null);
  const [stops, setStops]                       = useState([]);
  const [imageLocations, setImageLocations]     = useState([]);
  const [totalDistance, setTotalDistance]       = useState(0);
  const [showStops, setShowStops]               = useState(true);
  const [showImages, setShowImages]             = useState(true);
  const [drawerOpen, setDrawerOpen]             = useState(false);
  const [hasLocations, setHasLocations]         = useState(false);
  const [fetchingSession, setFetchingSession]   = useState(false);
  const [isRefreshing, setIsRefreshing]         = useState(false);
  const [initialLoadDone, setInitialLoadDone]   = useState(true); // Set to true since we already have sessions from props

  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef          = useRef(null);
  const mapInstance     = useRef(null);   // L.Map
  const polylines       = useRef([]);
  const markers         = useRef([]);
  const fetchedSessions = useRef(new Set());
  // Keep a ref to latest session so map callbacks don't go stale
  const sessionRef      = useRef(null);
  const stopsRef        = useRef([]);
  const imagesRef       = useRef([]);
  const showStopsRef    = useRef(true);
  const showImagesRef   = useRef(true);

  // Sync refs with state
  useEffect(() => { sessionRef.current    = selectedSession; }, [selectedSession]);
  useEffect(() => { stopsRef.current      = stops; },          [stops]);
  useEffect(() => { imagesRef.current     = imageLocations; }, [imageLocations]);
  useEffect(() => { showStopsRef.current  = showStops; },      [showStops]);
  useEffect(() => { showImagesRef.current = showImages; },     [showImages]);

  // ── Init sessions from props ───────────────────────────────────────────────
  useEffect(() => {
    if (sessions.length > 0) {
      setAllSessions(sessions);
    }
  }, [sessions]);

  // ── Process session data ───────────────────────────────────────────────────
  const processSessionData = useCallback((session) => {
    if (!session) return;
    setSelectedSession(session);

    if (session.locations?.length > 0) {
      setHasLocations(true);
      const detectedStops = detectStops(session.locations);
      const images = getImageLocations(session.locations);
      const dist = calcTotalDistance(session.locations);
      setStops(detectedStops);
      setImageLocations(images);
      setTotalDistance(dist);
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

      setSelectedSessionId(sessionId);
      setSelectedSession(null);
      setHasLocations(false);
      setStops([]);
      setImageLocations([]);
      setTotalDistance(0);

      // Try to find in allSessions
      const found = allSessions.find(
        (s) => String(s.sessionId || s._id) === sessionId
      );

      if (found?.locations?.length > 0) {
        processSessionData(found);
      } else if (sessionDetails && String(sessionDetails.sessionId) === sessionId) {
        processSessionData(sessionDetails);
      }
      // Otherwise the fetch useEffect below will handle it

      if (isMobile) setDrawerOpen(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedSessionId, allSessions, sessionDetails, isMobile]
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
    polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
    markers.current.forEach((m) => mapInstance.current.removeLayer(m));
    polylines.current = [];
    markers.current = [];
  };

  // ── Map: draw session ──────────────────────────────────────────────────────
  const drawSession = useCallback((session, stopsList, imagesList, showS, showI) => {
    if (!mapInstance.current || !session?.locations?.length) return;

    clearMap();

    const locs = session.locations;
    const routePoints = locs
      .map((l) => [parseFloat(l.latitude), parseFloat(l.longitude)])
      .filter(([a, b]) => !isNaN(a) && !isNaN(b));

    if (routePoints.length === 0) return;

    // Route polyline
    if (routePoints.length > 1) {
      const pl = L.polyline(routePoints, {
        color: "#2196F3", weight: 4, opacity: 0.8,
      }).addTo(mapInstance.current);
      polylines.current.push(pl);
    }

    const checkIn  = locs[0];
    const checkOut = locs.length > 1 ? locs[locs.length - 1] : null;

    // START marker
    const startM = L.marker(
      [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
      { icon: makeCheckIcon("checkin", "#22c55e", fmtTime(checkIn.timestamp), !!(checkIn.photo || checkIn.location_image)), zIndexOffset: 1000 }
    )
      .bindPopup(`<b style="color:#22c55e">🚀 START</b><br/>Time: ${fmtTime(checkIn.timestamp)}<br/>Address: ${checkIn.address || "N/A"}`)
      .addTo(mapInstance.current);
    markers.current.push(startM);

    // END marker
    if (checkOut) {
      const endM = L.marker(
        [parseFloat(checkOut.latitude), parseFloat(checkOut.longitude)],
        { icon: makeCheckIcon("checkout", "#ef4444", fmtTime(checkOut.timestamp), !!(checkOut.photo || checkOut.location_image)), zIndexOffset: 1000 }
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

    // Fit bounds
    const allPoints = [...routePoints];
    if (showS) stopsList.forEach((s) => allPoints.push([s.center.lat, s.center.lng]));
    if (showI) imagesList.forEach((i) => allPoints.push([i.location.lat, i.location.lng]));

    if (allPoints.length > 0) {
      mapInstance.current.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40] });
    }
  }, []); // No external deps — uses params only

  // ── Map: initialize once, update on session change ─────────────────────────
  useEffect(() => {
    if (!selectedSession?.locations?.length || !mapRef.current) return;

    const locs = selectedSession.locations;
    const first = locs[0];
    if (!first) return;

    // Destroy old map
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
      polylines.current = [];
      markers.current = [];
    }

    const map = L.map(mapRef.current, { zoomControl: true }).setView(
      [parseFloat(first.latitude), parseFloat(first.longitude)],
      14
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;

    // Draw after tiles settle
    const t = setTimeout(() => {
      map.invalidateSize();
      drawSession(selectedSession, stops, imageLocations, showStops, showImages);
    }, 250);

    return () => clearTimeout(t);
  // Only re-run when the session itself changes (not showStops/showImages)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSession]);

  // ── Map: redraw when filters or overlay data change (no re-init) ───────────
  useEffect(() => {
    if (!mapInstance.current || !selectedSession?.locations?.length) return;
    drawSession(selectedSession, stops, imageLocations, showStops, showImages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops, imageLocations, showStops, showImages]);

  // ── Window resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => mapInstance.current?.invalidateSize();
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
    
    // Simulate refresh by re-setting the sessions from props
    setTimeout(() => {
      if (sessions.length > 0) {
        setAllSessions([...sessions]);
      }
      setIsRefreshing(false);
    }, 500);
  };

  // ─── Session list (render fn, NOT a component — avoids remount) ─────────────
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
            const isLoading = isSelected && fetchingSession;

            // Distance: prefer stats, fallback to live calc
            const distMeters =
              session.stats?.totalDistance ??
              session.totalDistance ??
              (session.locations ? calcTotalDistance(session.locations) : 0);

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
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Locations</Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.65rem" }}>
                        {session.locationCount || session.locations?.length || 0}
                      </Typography>
                    </Grid>
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
  if (!initialLoadDone && isRefreshing) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
          <CircularProgress size={40} sx={{ color: "#2196F3", mb: 2 }} />
          <Typography>Loading sessions…</Typography>
        </Paper>
      </Box>
    );
  }

  if (fetchingSession && !selectedSession) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
          <CircularProgress size={40} sx={{ color: "#2196F3", mb: 2 }} />
          <Typography>Loading session details…</Typography>
        </Paper>
      </Box>
    );
  }

  if (sessionDetailsError) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
          <InfoIcon sx={{ fontSize: 36, color: "error.main", mb: 1 }} />
          <Typography color="error">Error loading session data</Typography>
          <Typography variant="caption" color="text.secondary">{sessionDetailsError}</Typography>
          <Button variant="contained" size="small" onClick={() => window.history.back()} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

  if (!selectedSession && allSessions.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
          <InfoIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
          <Typography>No Session Data</Typography>
          <Button variant="contained" size="small" onClick={() => window.history.back()} sx={{ mt: 1 }}>Go Back</Button>
        </Paper>
      </Box>
    );
  }

  const sessionIndex = allSessions.findIndex(
    (s) => String(s.sessionId || s._id) === String(selectedSessionId)
  );

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
              label={`Session ${sessionIndex + 1}`}
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
              <Paper sx={{ position: "absolute", top: 12, left: 12, p: 1, borderRadius: 1.5, maxWidth: 240, zIndex: 500 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: "0.7rem" }}>
                  Session #{sessionIndex + 1}
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
            <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
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