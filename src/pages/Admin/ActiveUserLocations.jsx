// import { useEffect, useState, useRef, useCallback } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Avatar,
//   Chip,
//   IconButton,
//   Tooltip,
//   alpha,
//   Divider,
//   Stack,
//   Badge,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
//   AccessTime as TimeIcon,
//   LocationOn as LocationIcon,
//   Image as ImageIcon,
//   Close as CloseIcon,
//   Fullscreen as FullscreenIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   MyLocation as MyLocationIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getActiveUserLocations } from "../../redux/slices/userSlice";

// const libraries = ["places"];

// const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

// const ActiveUserLocations = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');
  
//   const dispatch = useDispatch();
//   const { activeUserLocations, activeUserLocationsLoading } = useSelector(
//     (state) => state.user || {}
//   );
  
//   const [coordinates, setCoordinates] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India
//   const [mapZoom, setMapZoom] = useState(5);
//   const [mapReady, setMapReady] = useState(false);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [showUserList, setShowUserList] = useState(!isMobile);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);
  
//   const mapRef = useRef(null);

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_APIKEY,
//     libraries,
//   });

//   useEffect(() => {
//     refreshData();
//   }, [dispatch]);

//   const refreshData = async () => {
//     setIsRefreshing(true);
//     await dispatch(getActiveUserLocations());
//     setIsRefreshing(false);
//   };

//   const handleMapLoad = useCallback((map) => {
//     mapRef.current = map;
//     setMapReady(true);
//   }, []);

//   // Process user locations data
//   useEffect(() => {
//     if (activeUserLocations?.length > 0 && mapReady) {
//       const validLocations = activeUserLocations.filter(
//         (item) =>
//           item.latestLocation &&
//           !isNaN(parseFloat(item.latestLocation.latitude)) &&
//           !isNaN(parseFloat(item.latestLocation.longitude))
//       );

//       if (validLocations.length === 0) return;

//       const coords = validLocations.map((item) => ({
//         lat: parseFloat(item.latestLocation.latitude),
//         lng: parseFloat(item.latestLocation.longitude),
//         id: item.latestLocation._id,
//         userId: item.userId,
//         name: item.name,
//         email: item.email,
//         image: item.latestLocation.location_image,
//         timestamp: item.latestLocation.timestamp,
//         trackerId: item.trackerId,
//       }));

//       setCoordinates(coords);

//       if (coords.length > 0 && mapRef.current && window.google) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           coords.forEach((c) => bounds.extend(c));
//           mapRef.current.fitBounds(bounds);
//         } catch (error) {
//           console.error("Error setting map bounds:", error);
//         }
//       }
//     }
//   }, [activeUserLocations, mapReady]);

//   const handleMarkerClick = (marker) => {
//     setSelectedMarker(marker);
//     setSelectedUser(marker);
//   };

//   const handleInfoWindowClose = () => {
//     setSelectedMarker(null);
//   };

//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//     if (user.lat && user.lng) {
//       mapRef.current?.panTo({ lat: user.lat, lng: user.lng });
//       mapRef.current?.setZoom(16);
//     }
//     setSelectedMarker(user);
    
//     if (isMobile) {
//       setShowUserList(false);
//     }
//   };

//   const handleZoomIn = () => {
//     mapRef.current?.setZoom((mapRef.current.getZoom() || 14) + 1);
//   };

//   const handleZoomOut = () => {
//     mapRef.current?.setZoom((mapRef.current.getZoom() || 14) - 1);
//   };

//   const handleFitBounds = () => {
//     if (coordinates.length > 0 && mapRef.current && window.google) {
//       const bounds = new window.google.maps.LatLngBounds();
//       coordinates.forEach((c) => bounds.extend(c));
//       mapRef.current.fitBounds(bounds);
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return "N/A";
//     const date = new Date(timestamp);
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const LoadingSpinner = () => (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//         gap: 2,
//       }}
//     >
//       <CircularProgress sx={{ color: "#0f766e" }} />
//       <Typography variant="body2" color="text.secondary">
//         Loading user locations...
//       </Typography>
//     </Box>
//   );

//   if (loadError) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", p: 2 }}>
//         <Container maxWidth="xl" sx={{ py: 8 }}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 5,
//               borderRadius: 3,
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha("#ef4444", 0.2),
//             }}
//           >
//             <LocationIcon sx={{ fontSize: 48, color: alpha("#ef4444", 0.3), mb: 2 }} />
//             <Typography variant="h6" color="#ef4444" gutterBottom>
//               Error loading maps
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Please check your internet connection
//             </Typography>
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", p: 2 }}>
//         <Container maxWidth="xl" sx={{ py: 8 }}>
//           <LoadingSpinner />
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      
//       <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
//         {/* User List Sidebar */}
//         <AnimatePresence>
//           {showUserList && (
//             <motion.div
//               initial={{ x: -300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               style={{
//                 width: isMobile ? '100%' : 320,
//                 height: '100%',
//                 position: isMobile ? 'absolute' : 'relative',
//                 zIndex: 10,
//                 backgroundColor: '#ffffff',
//                 borderRight: '1px solid',
//                 borderColor: alpha('#e2e8f0', 0.5),
//                 overflow: 'hidden',
//               }}
//             >
//               <Box sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//               }}>
//                 {/* Header */}
//                 <Box sx={{ 
//                   p: 2.5, 
//                   borderBottom: '1px solid',
//                   borderColor: alpha('#e2e8f0', 0.5),
//                   background: 'linear-gradient(135deg, #0f766e, #0a5c55)',
//                   color: '#ffffff',
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <PersonIcon sx={{ fontSize: 20 }} />
//                       <Typography variant="h6" fontWeight={600} color="#ffffff">
//                         Active Users
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Chip
//                         label={activeUserLocations?.length || 0}
//                         size="small"
//                         sx={{
//                           bgcolor: '#ffffff',
//                           color: '#0f766e',
//                           fontWeight: 600,
//                           fontSize: '0.7rem',
//                           height: 20,
//                         }}
//                       />
//                       {isMobile && (
//                         <IconButton 
//                           size="small" 
//                           onClick={() => setShowUserList(false)}
//                           sx={{ color: '#ffffff' }}
//                         >
//                           <CloseIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* User List */}
//                 <Box sx={{ 
//                   flex: 1, 
//                   overflowY: 'auto',
//                   p: 1.5,
//                   '&::-webkit-scrollbar': {
//                     width: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha('#0f766e', 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   {activeUserLocationsLoading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                       <CircularProgress size={30} sx={{ color: '#0f766e' }} />
//                     </Box>
//                   ) : activeUserLocations?.length > 0 ? (
//                     <Stack spacing={1.5}>
//                       {activeUserLocations.map((user, index) => {
//                         const hasLocation = user.latestLocation?.latitude && user.latestLocation?.longitude;
//                         const isSelected = selectedUser?.userId === user.userId;
                        
//                         return (
//                           <motion.div
//                             key={user.userId}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.05 }}
//                           >
//                             <Paper
//                               elevation={0}
//                               onClick={() => handleUserSelect({
//                                 lat: parseFloat(user.latestLocation?.latitude),
//                                 lng: parseFloat(user.latestLocation?.longitude),
//                                 id: user.latestLocation?._id,
//                                 userId: user.userId,
//                                 name: user.name,
//                                 email: user.email,
//                                 image: user.latestLocation?.location_image,
//                                 timestamp: user.latestLocation?.timestamp,
//                                 trackerId: user.trackerId,
//                               })}
//                               sx={{
//                                 p: 1.5,
//                                 borderRadius: 2,
//                                 border: '1px solid',
//                                 borderColor: isSelected ? '#0f766e' : alpha('#e2e8f0', 0.5),
//                                 bgcolor: isSelected ? alpha('#0f766e', 0.05) : '#ffffff',
//                                 cursor: hasLocation ? 'pointer' : 'default',
//                                 opacity: hasLocation ? 1 : 0.6,
//                                 transition: 'all 0.2s ease',
//                                 '&:hover': hasLocation ? {
//                                   borderColor: '#0f766e',
//                                   bgcolor: alpha('#0f766e', 0.02),
//                                   transform: 'translateX(4px)',
//                                 } : {},
//                               }}
//                             >
//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                                 <Badge
//                                   overlap="circular"
//                                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                                   badgeContent={
//                                     <Box
//                                       sx={{
//                                         width: 10,
//                                         height: 10,
//                                         borderRadius: '50%',
//                                         bgcolor: hasLocation ? '#22c55e' : '#ef4444',
//                                         border: '2px solid #ffffff',
//                                       }}
//                                     />
//                                   }
//                                 >
//                                   <Avatar
//                                     sx={{
//                                       width: 40,
//                                       height: 40,
//                                       bgcolor: alpha('#0f766e', 0.1),
//                                       color: '#0f766e',
//                                     }}
//                                   >
//                                     {user.name?.charAt(0) || <PersonIcon />}
//                                   </Avatar>
//                                 </Badge>
//                                 <Box sx={{ flex: 1, minWidth: 0 }}>
//                                   <Typography variant="subtitle2" fontWeight={600} noWrap>
//                                     {user.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" noWrap>
//                                     {user.email}
//                                   </Typography>
//                                   {user.latestLocation?.timestamp && (
//                                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
//                                       <TimeIcon sx={{ fontSize: 10, mr: 0.5, verticalAlign: 'middle' }} />
//                                       {formatTime(user.latestLocation.timestamp)}
//                                     </Typography>
//                                   )}
//                                 </Box>
//                                 {hasLocation && (
//                                   <LocationIcon sx={{ color: '#0f766e', fontSize: 16 }} />
//                                 )}
//                               </Box>
//                             </Paper>
//                           </motion.div>
//                         );
//                       })}
//                     </Stack>
//                   ) : (
//                     <Box sx={{ textAlign: 'center', py: 4 }}>
//                       <PersonIcon sx={{ fontSize: 48, color: alpha('#0f766e', 0.3), mb: 2 }} />
//                       <Typography variant="body2" color="text.secondary">
//                         No active users found
//                       </Typography>
//                     </Box>
//                   )}
//                 </Box>

//                 {/* Footer */}
//                 <Box sx={{ 
//                   p: 1.5, 
//                   borderTop: '1px solid',
//                   borderColor: alpha('#e2e8f0', 0.5),
//                   bgcolor: '#f8fafc',
//                 }}>
//                   <Tooltip title="Refresh">
//                     <IconButton
//                       size="small"
//                       onClick={refreshData}
//                       disabled={isRefreshing}
//                       sx={{ color: '#0f766e' }}
//                     >
//                       <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
//                     </IconButton>
//                   </Tooltip>
//                   <style>
//                     {`
//                       @keyframes spin {
//                         0% { transform: rotate(0deg); }
//                         100% { transform: rotate(360deg); }
//                       }
//                     `}
//                   </style>
//                 </Box>
//               </Box>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Map Container */}
//         <Box sx={{ 
//           flex: 1, 
//           position: 'relative',
//           height: '100%',
//         }}>
//           {/* Map Controls */}
//           <Box sx={{
//             position: 'absolute',
//             top: 16,
//             right: 16,
//             zIndex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 1,
//           }}>
//             <Paper
//               elevation={3}
//               sx={{
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 bgcolor: '#ffffff',
//               }}
//             >
//               <IconButton onClick={handleZoomIn} size="small" sx={{ borderRadius: 0 }}>
//                 <ZoomInIcon fontSize="small" />
//               </IconButton>
//               <Divider />
//               <IconButton onClick={handleZoomOut} size="small" sx={{ borderRadius: 0 }}>
//                 <ZoomOutIcon fontSize="small" />
//               </IconButton>
//               <Divider />
//               <IconButton onClick={handleFitBounds} size="small" sx={{ borderRadius: 0 }}>
//                 <FullscreenIcon fontSize="small" />
//               </IconButton>
//             </Paper>
            
//             {isMobile && !showUserList && (
//               <Tooltip title="Show Users">
//                 <IconButton
//                   onClick={() => setShowUserList(true)}
//                   sx={{
//                     bgcolor: '#0f766e',
//                     color: '#ffffff',
//                     '&:hover': { bgcolor: '#0a5c55' },
//                   }}
//                 >
//                   <PersonIcon />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Box>

//           {/* Google Map */}
//           <GoogleMap
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//             center={mapCenter}
//             zoom={mapZoom}
//             onLoad={handleMapLoad}
//             options={{
//               streetViewControl: false,
//               mapTypeControl: false,
//               fullscreenControl: false,
//               zoomControl: false,
//               scaleControl: true,
//               styles: [
//                 {
//                   featureType: "poi",
//                   elementType: "labels",
//                   stylers: [{ visibility: "off" }],
//                 },
//               ],
//             }}
//           >
//             {!activeUserLocationsLoading &&
//               coordinates.map((coord) => (
//                 <Marker
//                   key={coord.id}
//                   position={coord}
//                   onClick={() => handleMarkerClick(coord)}
//                   icon={{
//                     url: coord.image 
//                       ? "https://cdn-icons-png.flaticon.com/512/447/447031.png"
//                       : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//                     scaledSize: new window.google.maps.Size(32, 32),
//                   }}
//                 >
//                   {selectedMarker?.id === coord.id && (
//                     <InfoWindow onCloseClick={handleInfoWindowClose}>
//                       <Box sx={{ maxWidth: 250, p: 0.5 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                           <Avatar
//                             sx={{
//                               width: 32,
//                               height: 32,
//                               bgcolor: alpha('#0f766e', 0.1),
//                               color: '#0f766e',
//                             }}
//                           >
//                             {coord.name?.charAt(0)}
//                           </Avatar>
//                           <Box>
//                             <Typography variant="subtitle2" fontWeight={600}>
//                               {coord.name}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {coord.email}
//                             </Typography>
//                           </Box>
//                         </Box>
                        
//                         <Divider sx={{ my: 1 }} />
                        
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
//                           <TimeIcon sx={{ color: '#64748b', fontSize: 14 }} />
//                           <Typography variant="caption">
//                             {formatDate(coord.timestamp)} at {formatTime(coord.timestamp)}
//                           </Typography>
//                         </Box>
                        
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                           <LocationIcon sx={{ color: '#0f766e', fontSize: 14 }} />
//                           <Typography variant="caption">
//                             {coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}
//                           </Typography>
//                         </Box>
                        
//                         {coord.image && (
//                           <Box sx={{ mt: 1 }}>
//                             <img
//                               src={coord.image}
//                               alt="Location"
//                               style={{
//                                 width: '100%',
//                                 maxHeight: 120,
//                                 objectFit: 'cover',
//                                 borderRadius: 4,
//                               }}
//                             />
//                           </Box>
//                         )}
//                       </Box>
//                     </InfoWindow>
//                   )}
//                 </Marker>
//               ))}
//           </GoogleMap>

//           {/* Loading Overlay */}
//           {activeUserLocationsLoading && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 bgcolor: 'rgba(255,255,255,0.7)',
//                 backdropFilter: 'blur(3px)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 zIndex: 2,
//               }}
//             >
//               <LoadingSpinner />
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ActiveUserLocations;






import { useEffect, useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  Divider,
  Stack,
  Badge,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MyLocation as MyLocationIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getActiveUserLocations } from "../../redux/slices/userSlice";

const libraries = ["places"];

const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

const ActiveUserLocations = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  
  const dispatch = useDispatch();
  const { activeUserLocations, activeUserLocationsLoading } = useSelector(
    (state) => state.user || {}
  );
  
  const [coordinates, setCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showUserList, setShowUserList] = useState(!isMobile);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries,
  });

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await dispatch(getActiveUserLocations());
    setIsRefreshing(false);
  };

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapReady(true);
  }, []);

  // Process user locations data
  useEffect(() => {
    if (activeUserLocations?.length > 0 && mapReady) {
      const validLocations = activeUserLocations.filter(
        (item) =>
          item.latestLocation &&
          !isNaN(parseFloat(item.latestLocation.latitude)) &&
          !isNaN(parseFloat(item.latestLocation.longitude))
      );

      if (validLocations.length === 0) return;

      const coords = validLocations.map((item) => ({
        lat: parseFloat(item.latestLocation.latitude),
        lng: parseFloat(item.latestLocation.longitude),
        id: item.latestLocation._id,
        userId: item.userId,
        name: item.name,
        email: item.email,
        image: item.latestLocation.location_image,
        timestamp: item.latestLocation.timestamp,
        trackerId: item.trackerId,
      }));

      setCoordinates(coords);

      if (coords.length > 0 && mapRef.current && window.google) {
        try {
          const bounds = new window.google.maps.LatLngBounds();
          coords.forEach((c) => bounds.extend(c));
          mapRef.current.fitBounds(bounds);
        } catch (error) {
          console.error("Error setting map bounds:", error);
        }
      }
    }
  }, [activeUserLocations, mapReady]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setSelectedUser(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (user.lat && user.lng) {
      mapRef.current?.panTo({ lat: user.lat, lng: user.lng });
      mapRef.current?.setZoom(16);
    }
    setSelectedMarker(user);
    
    if (isMobile) {
      setShowUserList(false);
    }
  };

  const handleZoomIn = () => {
    mapRef.current?.setZoom((mapRef.current.getZoom() || 14) + 1);
  };

  const handleZoomOut = () => {
    mapRef.current?.setZoom((mapRef.current.getZoom() || 14) - 1);
  };

  const handleFitBounds = () => {
    if (coordinates.length > 0 && mapRef.current && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((c) => bounds.extend(c));
      mapRef.current.fitBounds(bounds);
    }
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const LoadingSpinner = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: "#0f766e" }} />
      <Typography variant="body2" color="text.secondary">
        Loading user locations...
      </Typography>
    </Box>
  );

  if (loadError) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", p: 2 }}>
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 3,
              textAlign: "center",
              border: "1px solid",
              borderColor: alpha("#ef4444", 0.2),
            }}
          >
            <LocationIcon sx={{ fontSize: 48, color: alpha("#ef4444", 0.3), mb: 2 }} />
            <Typography variant="h6" color="#ef4444" gutterBottom>
              Error loading maps
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check your internet connection
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", p: 2 }}>
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <LoadingSpinner />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* Map Container */}
        <Box sx={{ 
          flex: 1, 
          position: 'relative',
          height: '100%',
          transition: 'width 0.3s ease',
        }}>
          {/* Toggle Button - Small tab when hidden */}
          {!showUserList && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                zIndex: 30,
              }}
            >
              <Paper
                elevation={4}
                onClick={toggleUserList}
                sx={{
                  p: 1,
                  bgcolor: '#0f766e',
                  color: '#ffffff',
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': {
                    bgcolor: '#0a5c55',
                  },
                }}
              >
                <ChevronLeftIcon />
                <PeopleIcon fontSize="small" />
                <Chip
                  label={activeUserLocations?.length || 0}
                  size="small"
                  sx={{
                    bgcolor: '#ffffff',
                    color: '#0f766e',
                    fontWeight: 600,
                    fontSize: '0.6rem',
                    height: 16,
                    minWidth: 16,
                  }}
                />
              </Paper>
            </motion.div>
          )}

          {/* Map Controls */}
          <Box sx={{
            position: 'absolute',
            top: 16,
            right: showUserList ? (isMobile ? 16 : 336) : 16,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            transition: 'right 0.3s ease',
          }}>
            {/* <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#ffffff',
              }}
            >
              <IconButton onClick={handleZoomIn} size="small" sx={{ borderRadius: 0 }}>
                <ZoomInIcon fontSize="small" />
              </IconButton>
              <Divider />
              <IconButton onClick={handleZoomOut} size="small" sx={{ borderRadius: 0 }}>
                <ZoomOutIcon fontSize="small" />
              </IconButton>
              <Divider />
              <IconButton onClick={handleFitBounds} size="small" sx={{ borderRadius: 0 }}>
                <FullscreenIcon fontSize="small" />
              </IconButton>
            </Paper> */}
          </Box>

          {/* Google Map */}
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={mapCenter}
            zoom={mapZoom}
            onLoad={handleMapLoad}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: false,
              scaleControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ],
            }}
          >
            {!activeUserLocationsLoading &&
              coordinates.map((coord) => (
                <Marker
                  key={coord.id}
                  position={coord}
                  onClick={() => handleMarkerClick(coord)}
                  icon={{
                    url: coord.image 
                      ? "https://cdn-icons-png.flaticon.com/512/447/447031.png"
                      : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                    scaledSize: new window.google.maps.Size(32, 32),
                  }}
                >
                  {selectedMarker?.id === coord.id && (
                    <InfoWindow onCloseClick={handleInfoWindowClose}>
                      <Box sx={{ maxWidth: 250, p: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: alpha('#0f766e', 0.1),
                              color: '#0f766e',
                            }}
                          >
                            {coord.name?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {coord.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {coord.email}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          <TimeIcon sx={{ color: '#64748b', fontSize: 14 }} />
                          <Typography variant="caption">
                            {formatDate(coord.timestamp)} at {formatTime(coord.timestamp)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon sx={{ color: '#0f766e', fontSize: 14 }} />
                          <Typography variant="caption">
                            {coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}
                          </Typography>
                        </Box>
                        
                        {coord.image && (
                          <Box sx={{ mt: 1 }}>
                            <img
                              src={coord.image}
                              alt="Location"
                              style={{
                                width: '100%',
                                maxHeight: 120,
                                objectFit: 'cover',
                                borderRadius: 4,
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>

          {/* Loading Overlay */}
          {activeUserLocationsLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(3px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <LoadingSpinner />
            </Box>
          )}
        </Box>

        {/* User List Sidebar - Now on the Right */}
        <AnimatePresence>
          {showUserList && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: isMobile ? '100%' : 320,
                height: '100%',
                position: isMobile ? 'absolute' : 'relative',
                right: 0,
                zIndex: 10,
                backgroundColor: '#ffffff',
                borderLeft: '1px solid',
                borderColor: alpha('#e2e8f0', 0.5),
                overflow: 'hidden',
              }}
            >
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
              }}>
                {/* Header with Hide Button */}
                <Box sx={{ 
                  p: 2.5, 
                  borderBottom: '1px solid',
                  borderColor: alpha('#e2e8f0', 0.5),
                  background: 'linear-gradient(135deg, #0f766e, #0a5c55)',
                  color: '#ffffff',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon sx={{ fontSize: 20 }} />
                      <Typography variant="h6" fontWeight={600} color="#ffffff">
                        Active Users
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={activeUserLocations?.length || 0}
                        size="small"
                        sx={{
                          bgcolor: '#ffffff',
                          color: '#0f766e',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                      <Tooltip title="Hide List">
                        <IconButton 
                          size="small" 
                          onClick={toggleUserList}
                          sx={{ 
                            color: '#ffffff',
                            '&:hover': {
                              bgcolor: alpha('#ffffff', 0.1),
                            },
                          }}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>

                {/* User List */}
                <Box sx={{ 
                  flex: 1, 
                  overflowY: 'auto',
                  p: 1.5,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha('#0f766e', 0.3),
                    borderRadius: '3px',
                  },
                }}>
                  {activeUserLocationsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                      <CircularProgress size={30} sx={{ color: '#0f766e' }} />
                    </Box>
                  ) : activeUserLocations?.length > 0 ? (
                    <Stack spacing={1.5}>
                      {activeUserLocations.map((user, index) => {
                        const hasLocation = user.latestLocation?.latitude && user.latestLocation?.longitude;
                        const isSelected = selectedUser?.userId === user.userId;
                        
                        return (
                          <motion.div
                            key={user.userId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Paper
                              elevation={0}
                              onClick={() => handleUserSelect({
                                lat: parseFloat(user.latestLocation?.latitude),
                                lng: parseFloat(user.latestLocation?.longitude),
                                id: user.latestLocation?._id,
                                userId: user.userId,
                                name: user.name,
                                email: user.email,
                                image: user.latestLocation?.location_image,
                                timestamp: user.latestLocation?.timestamp,
                                trackerId: user.trackerId,
                              })}
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: isSelected ? '#0f766e' : alpha('#e2e8f0', 0.5),
                                bgcolor: isSelected ? alpha('#0f766e', 0.05) : '#ffffff',
                                cursor: hasLocation ? 'pointer' : 'default',
                                opacity: hasLocation ? 1 : 0.6,
                                transition: 'all 0.2s ease',
                                '&:hover': hasLocation ? {
                                  borderColor: '#0f766e',
                                  bgcolor: alpha('#0f766e', 0.02),
                                  transform: 'translateX(-4px)',
                                } : {},
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Badge
                                  overlap="circular"
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                  badgeContent={
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        bgcolor: hasLocation ? '#22c55e' : '#ef4444',
                                        border: '2px solid #ffffff',
                                      }}
                                    />
                                  }
                                >
                                  <Avatar
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      bgcolor: alpha('#0f766e', 0.1),
                                      color: '#0f766e',
                                    }}
                                  >
                                    {user.name?.charAt(0) || <PersonIcon />}
                                  </Avatar>
                                </Badge>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography variant="subtitle2" fontWeight={600} noWrap>
                                    {user.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" noWrap>
                                    {user.email}
                                  </Typography>
                                  {user.latestLocation?.timestamp && (
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                                      <TimeIcon sx={{ fontSize: 10, mr: 0.5, verticalAlign: 'middle' }} />
                                      {formatTime(user.latestLocation.timestamp)}
                                    </Typography>
                                  )}
                                </Box>
                                {hasLocation && (
                                  <LocationIcon sx={{ color: '#0f766e', fontSize: 16 }} />
                                )}
                              </Box>
                            </Paper>
                          </motion.div>
                        );
                      })}
                    </Stack>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <PersonIcon sx={{ fontSize: 48, color: alpha('#0f766e', 0.3), mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        No active users found
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Footer */}
                <Box sx={{ 
                  p: 1.5, 
                  borderTop: '1px solid',
                  borderColor: alpha('#e2e8f0', 0.5),
                  bgcolor: '#f8fafc',
                }}>
                  <Tooltip title="Refresh">
                    <IconButton
                      size="small"
                      onClick={refreshData}
                      disabled={isRefreshing}
                      sx={{ color: '#0f766e' }}
                    >
                      <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
                    </IconButton>
                  </Tooltip>
                  <style>
                    {`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}
                  </style>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ActiveUserLocations;