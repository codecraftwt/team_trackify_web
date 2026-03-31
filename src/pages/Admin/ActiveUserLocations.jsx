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
//   Drawer,
//   Fab,
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
//   Menu as MenuIcon,
//   ChevronRight as ChevronRightIcon,
//   ChevronLeft as ChevronLeftIcon,
//   People as PeopleIcon,
//   ArrowBack as ArrowBackIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getActiveUserLocations } from "../../redux/slices/userSlice";
// import { useLocation, useNavigate } from "react-router-dom";

// const libraries = ["places"];

// const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

// const ActiveUserLocations = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isLandscape = useMediaQuery('(orientation: landscape)');

//   const dispatch = useDispatch();
//   const { activeUserLocations, activeUserLocationsLoading } = useSelector(
//     (state) => state.user || {}
//   );
//   // ✅ Get adminId from navigation state
//   const adminId = location.state?.adminId;

//   // ✅ Log for debugging
//   console.log("ActiveUserLocations - Received adminId:", adminId);
//   console.log("ActiveUserLocations - Full location state:", location.state);
//   const [coordinates, setCoordinates] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
//   const [mapZoom, setMapZoom] = useState(5);
//   const [mapReady, setMapReady] = useState(false);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [showUserList, setShowUserList] = useState(!isMobile);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const mapRef = useRef(null);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_APIKEY,
//     libraries,
//   });

//   useEffect(() => {
//     refreshData();
//   }, [dispatch]);

//   const refreshData = async () => {
//     setIsRefreshing(true);
//     await dispatch(getActiveUserLocations(adminId));
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
//     if (isMobile) {
//       setDrawerOpen(false);
//     }
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
//       setDrawerOpen(false);
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

//   const toggleUserList = () => {
//     if (isMobile) {
//       setDrawerOpen(!drawerOpen);
//     } else {
//       setShowUserList(!showUserList);
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
//         gap: 1.5,
//       }}
//     >
//       <CircularProgress size={32} sx={{ color: theme.palette.primary.main }} />
//       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//         Loading user locations...
//       </Typography>
//     </Box>
//   );

//   // Map Controls Component - Now on LEFT side
//   const MapControls = () => (
//     <Box
//       sx={{
//         position: 'absolute',
//         top: 16,
//         left: 16, // Changed from right to left
//         zIndex: 10,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 1,
//         transition: 'left 0.3s ease',
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           borderRadius: 2,
//           overflow: 'hidden',
//           bgcolor: alpha(theme.palette.background.paper, 0.9),
//           backdropFilter: 'blur(8px)',
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.2),
//         }}
//       >
//         <Tooltip title="Zoom In">
//           <IconButton
//             onClick={handleZoomIn}
//             size="small"
//             sx={{
//               borderRadius: 0,
//               p: { xs: 0.8, sm: 1 },
//               color: theme.palette.primary.main,
//               borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//               '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <ZoomInIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Zoom Out">
//           <IconButton
//             onClick={handleZoomOut}
//             size="small"
//             sx={{
//               borderRadius: 0,
//               p: { xs: 0.8, sm: 1 },
//               color: theme.palette.primary.main,
//               borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//               '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <ZoomOutIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Fit All Markers">
//           <IconButton
//             onClick={handleFitBounds}
//             size="small"
//             sx={{
//               borderRadius: 0,
//               p: { xs: 0.8, sm: 1 },
//               color: theme.palette.primary.main,
//               '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <MyLocationIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//           </IconButton>
//         </Tooltip>
//       </Paper>

//       <Tooltip title="Refresh Data">
//         <IconButton
//           onClick={refreshData}
//           disabled={isRefreshing}
//           size="small"
//           sx={{
//             bgcolor: alpha(theme.palette.background.paper, 0.9),
//             backdropFilter: 'blur(8px)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.2),
//             color: theme.palette.primary.main,
//             '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             p: { xs: 0.8, sm: 1 },
//           }}
//         >
//           <RefreshIcon sx={{ fontSize: { xs: 16, sm: 18 }, animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );

//   // User List Component (for desktop)
//   const UserList = ({ isDesktop }) => (
//     <Box sx={{
//       height: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       width: isDesktop ? 280 : '100%',
//     }}>
//       {/* Header */}
//       <Box sx={{
//         p: { xs: 1.5, sm: 2 },
//         borderBottom: '1px solid',
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: '#ffffff',
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <PersonIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//             <Typography variant="subtitle2" fontWeight={600} color="#ffffff" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
//               Active Users
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//             <Chip
//               label={activeUserLocations?.length || 0}
//               size="small"
//               sx={{
//                 bgcolor: '#ffffff',
//                 color: theme.palette.primary.main,
//                 fontWeight: 600,
//                 fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                 height: { xs: 16, sm: 18 },
//               }}
//             />
//             {isDesktop && (
//               <Tooltip title="Hide List">
//                 <IconButton
//                   size="small"
//                   onClick={toggleUserList}
//                   sx={{
//                     color: '#ffffff',
//                     width: { xs: 24, sm: 26 },
//                     height: { xs: 24, sm: 26 },
//                     '&:hover': {
//                       bgcolor: alpha('#ffffff', 0.1),
//                     },
//                   }}
//                 >
//                   <ChevronRightIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Box>
//         </Box>
//       </Box>

//       {/* User List */}
//       <Box sx={{
//         flex: 1,
//         overflowY: 'auto',
//         p: { xs: 1, sm: 1.2 },
//         '&::-webkit-scrollbar': {
//           width: '4px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '2px',
//         },
//       }}>
//         {activeUserLocationsLoading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
//             <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
//           </Box>
//         ) : activeUserLocations?.length > 0 ? (
//           <Stack spacing={1}>
//             {activeUserLocations.map((user, index) => {
//               const hasLocation = user.latestLocation?.latitude && user.latestLocation?.longitude;
//               const isSelected = selectedUser?.userId === user.userId;

//               return (
//                 <motion.div
//                   key={user.userId}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <Paper
//                     elevation={0}
//                     onClick={() => hasLocation && handleUserSelect({
//                       lat: parseFloat(user.latestLocation?.latitude),
//                       lng: parseFloat(user.latestLocation?.longitude),
//                       id: user.latestLocation?._id,
//                       userId: user.userId,
//                       name: user.name,
//                       email: user.email,
//                       image: user.latestLocation?.location_image,
//                       timestamp: user.latestLocation?.timestamp,
//                       trackerId: user.trackerId,
//                     })}
//                     sx={{
//                       p: { xs: 1, sm: 1.2 },
//                       borderRadius: 1.5,
//                       border: '1px solid',
//                       borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
//                       bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.05) : theme.palette.background.paper,
//                       cursor: hasLocation ? 'pointer' : 'default',
//                       opacity: hasLocation ? 1 : 0.6,
//                       transition: 'all 0.2s ease',
//                       '&:hover': hasLocation ? {
//                         borderColor: theme.palette.primary.main,
//                         bgcolor: alpha(theme.palette.primary.main, 0.02),
//                         transform: { xs: 'none', sm: 'translateX(-2px)' },
//                       } : {},
//                     }}
//                   >
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Badge
//                         overlap="circular"
//                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                         badgeContent={
//                           <Box
//                             sx={{
//                               width: { xs: 7, sm: 8 },
//                               height: { xs: 7, sm: 8 },
//                               borderRadius: '50%',
//                               bgcolor: hasLocation ? '#22c55e' : '#ef4444',
//                               border: '1.5px solid #ffffff',
//                             }}
//                           />
//                         }
//                       >
//                         <Avatar
//                           sx={{
//                             width: { xs: 28, sm: 32 },
//                             height: { xs: 28, sm: 32 },
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                             fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                           }}
//                         >
//                           {user.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                         </Avatar>
//                       </Badge>
//                       <Box sx={{ flex: 1, minWidth: 0 }}>
//                         <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                           {user.name}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                           {user.email}
//                         </Typography>
//                         {user.latestLocation?.timestamp && (
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' }, display: 'flex', alignItems: 'center', gap: 0.3, mt: 0.2 }}>
//                             <TimeIcon sx={{ fontSize: { xs: 7, sm: 8 }, color: theme.palette.primary.main }} />
//                             {formatTime(user.latestLocation.timestamp)}
//                           </Typography>
//                         )}
//                       </Box>
//                       {hasLocation && (
//                         <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 14 } }} />
//                       )}
//                     </Box>
//                   </Paper>
//                 </motion.div>
//               );
//             })}
//           </Stack>
//         ) : (
//           <Box sx={{ textAlign: 'center', py: 3 }}>
//             <PersonIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//               No active users found
//             </Typography>
//           </Box>
//         )}
//       </Box>

//       {/* Footer */}
//       <Box sx={{
//         p: { xs: 1, sm: 1.2 },
//         borderTop: '1px solid',
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         bgcolor: alpha(theme.palette.primary.main, 0.05),
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Tooltip title="Refresh">
//             <IconButton
//               size="small"
//               onClick={refreshData}
//               disabled={isRefreshing}
//               sx={{ color: theme.palette.primary.main, width: { xs: 26, sm: 28 }, height: { xs: 26, sm: 28 } }}
//             >
//               <RefreshIcon sx={{ fontSize: { xs: 14, sm: 16 }, animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
//             </IconButton>
//           </Tooltip>
//           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, ml: 0.5 }}>
//             {coordinates.length} active
//           </Typography>
//         </Box>

//         {isMobile && (
//           <Tooltip title="Close">
//             <IconButton
//               size="small"
//               onClick={toggleUserList}
//               sx={{ color: theme.palette.primary.main, width: 26, height: 26 }}
//             >
//               <CloseIcon sx={{ fontSize: 14 }} />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Box>
//     </Box>
//   );

//   if (loadError) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper, p: 1.5 }}>
//         <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 6 } }}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 2, sm: 4 },
//               borderRadius: { xs: 1.5, sm: 2.5 },
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha("#ef4444", 0.2),
//             }}
//           >
//             <LocationIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: alpha("#ef4444", 0.3), mb: 1.5 }} />
//             <Typography variant="h6" color="#ef4444" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//               Error loading maps
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//               Please check your internet connection
//             </Typography>
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper, p: 1.5 }}>
//         <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 6 } }}>
//           <LoadingSpinner />
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper, display: 'flex', flexDirection: 'column' }}>

//       {/* Custom Header with Back Button */}
//       <Box
//         sx={{
//           backgroundColor: theme.palette.background.paper,
//           borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//           padding: { xs: '6px 12px', sm: '8px 16px' },
//           display: "flex",
//           alignItems: "center",
//           gap: 1.5,
//         }}
//       >
//         <IconButton
//           onClick={handleBack}
//           size="small"
//           sx={{
//             color: theme.palette.primary.main,
//             width: { xs: 28, sm: 32 },
//             height: { xs: 28, sm: 32 },
//             "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//           }}
//         >
//           <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//         </IconButton>
//         <Typography
//           variant="body1"
//           fontWeight={600}
//           sx={{
//             fontSize: { xs: '0.8rem', sm: '0.9rem' },
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Live User Locations
//         </Typography>

//         {/* Mobile Menu Button */}
//         {isMobile && (
//           <Box sx={{ ml: 'auto' }}>
//             <Fab
//               size="small"
//               color="primary"
//               onClick={toggleUserList}
//               sx={{
//                 width: 36,
//                 height: 36,
//                 boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//               }}
//             >
//               <PeopleIcon sx={{ fontSize: 18 }} />
//             </Fab>
//           </Box>
//         )}
//       </Box>

//       <Box sx={{
//         display: "flex",
//         height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
//         position: 'relative',
//       }}>
//         {/* Map Container */}
//         <Box sx={{
//           flex: 1,
//           position: 'relative',
//           height: '100%',
//           transition: 'width 0.3s ease',
//         }}>
//           {/* Toggle Button - Desktop only */}
//           {!isMobile && !showUserList && (
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: 50, opacity: 0 }}
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 right: 0,
//                 transform: 'translateY(-50%)',
//                 zIndex: 30,
//               }}
//             >
//               <Paper
//                 elevation={4}
//                 onClick={toggleUserList}
//                 sx={{
//                   p: 0.8,
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   color: '#ffffff',
//                   borderTopLeftRadius: 10,
//                   borderBottomLeftRadius: 10,
//                   borderTopRightRadius: 0,
//                   borderBottomRightRadius: 0,
//                   cursor: 'pointer',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   gap: 0.3,
//                   '&:hover': {
//                     background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                   },
//                 }}
//               >
//                 <ChevronLeftIcon sx={{ fontSize: 16 }} />
//                 <PeopleIcon sx={{ fontSize: 14 }} />
//                 <Chip
//                   label={activeUserLocations?.length || 0}
//                   size="small"
//                   sx={{
//                     bgcolor: '#ffffff',
//                     color: theme.palette.primary.main,
//                     fontWeight: 600,
//                     fontSize: '0.5rem',
//                     height: 14,
//                     minWidth: 14,
//                     '& .MuiChip-label': { px: 0.5 }
//                   }}
//                 />
//               </Paper>
//             </motion.div>
//           )}

//           {/* Map Controls - Now on LEFT side */}
//           <MapControls />

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
//                     scaledSize: new window.google.maps.Size(isSmallMobile ? 24 : 28, isSmallMobile ? 24 : 28),
//                   }}
//                 >
//                   {selectedMarker?.id === coord.id && (
//                     <InfoWindow onCloseClick={handleInfoWindowClose}>
//                       <Box sx={{ maxWidth: { xs: 180, sm: 220 }, p: 0.3 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
//                           <Avatar
//                             sx={{
//                               width: { xs: 24, sm: 28 },
//                               height: { xs: 24, sm: 28 },
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                               color: theme.palette.primary.main,
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             }}
//                           >
//                             {coord.name?.charAt(0)}
//                           </Avatar>
//                           <Box>
//                             <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                               {coord.name}
//                             </Typography>
//                             <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }} color="text.secondary">
//                               {coord.email}
//                             </Typography>
//                           </Box>
//                         </Box>

//                         <Divider sx={{ my: 0.5 }} />

//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, mb: 0.3, flexWrap: 'wrap' }}>
//                           <TimeIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 10, sm: 12 } }} />
//                           <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             {formatDate(coord.timestamp)} at {formatTime(coord.timestamp)}
//                           </Typography>
//                         </Box>

//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
//                           <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 10, sm: 12 } }} />
//                           <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             {coord.lat.toFixed(4)}, {coord.lng.toFixed(4)}
//                           </Typography>
//                         </Box>

//                         {coord.image && (
//                           <Box sx={{ mt: 0.8 }}>
//                             <img
//                               src={coord.image}
//                               alt="Location"
//                               style={{
//                                 width: '100%',
//                                 maxHeight: { xs: 80, sm: 100 },
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
//                 bgcolor: alpha(theme.palette.background.paper, 0.7),
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

//         {/* Desktop User List Sidebar */}
//         {!isMobile && showUserList && (
//           <motion.div
//             initial={{ x: 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 300, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             style={{
//               width: 280,
//               height: '100%',
//               position: 'relative',
//               zIndex: 10,
//               backgroundColor: theme.palette.background.paper,
//               borderLeft: '1px solid',
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: 'hidden',
//             }}
//           >
//             <UserList isDesktop={true} />
//           </motion.div>
//         )}

//         {/* Mobile Drawer */}
//         {isMobile && (
//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={toggleUserList}
//             PaperProps={{
//               sx: {
//                 width: '85%',
//                 maxWidth: 320,
//                 borderTopLeftRadius: 16,
//                 borderBottomLeftRadius: 16,
//                 overflow: 'hidden',
//               },
//             }}
//           >
//             <UserList isDesktop={false} />
//           </Drawer>
//         )}
//       </Box>

//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
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
  Drawer,
  Fab,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MyLocation as MyLocationIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  People as PeopleIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getActiveUserLocations } from "../../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const libraries = ["places"];

const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

// Helper function to check if coordinates are valid (not 0,0 and not null/undefined)
const isValidCoordinates = (lat, lng) => {
  if (!lat || !lng) return false;
  const numLat = parseFloat(lat);
  const numLng = parseFloat(lng);
  return !isNaN(numLat) && !isNaN(numLng) && 
         !(numLat === 0 && numLng === 0) &&
         Math.abs(numLat) <= 90 && Math.abs(numLng) <= 180;
};

const ActiveUserLocations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const dispatch = useDispatch();
  const { activeUserLocations, activeUserLocationsLoading } = useSelector(
    (state) => state.user || {}
  );
  const adminId = location.state?.adminId;

  const [coordinates, setCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null); // Store only ONE marker ID
  const [showUserList, setShowUserList] = useState(!isMobile);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const mapRef = useRef(null);

  const handleBack = () => {
    navigate(-1);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries,
  });

  useEffect(() => {
    refreshData();
    setSelectedMarkerId(null);
    setSelectedUser(null);
  }, [dispatch]);

  const refreshData = async () => {
    setIsRefreshing(true);
    setSelectedMarkerId(null);
    setSelectedUser(null);
    await dispatch(getActiveUserLocations(adminId));
    setIsRefreshing(false);
  };

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapReady(true);
    setIsMapInitialized(true);
    setSelectedMarkerId(null);
    setSelectedUser(null);
  }, []);

  // Process user locations data
  useEffect(() => {
    if (activeUserLocations?.length > 0 && mapReady) {
      const validLocations = activeUserLocations.filter(
        (item) =>
          item.latestLocation &&
          isValidCoordinates(
            parseFloat(item.latestLocation.latitude),
            parseFloat(item.latestLocation.longitude)
          )
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
      setSelectedMarkerId(null);
      setSelectedUser(null);

      if (coords.length > 0 && mapRef.current && window.google && isMapInitialized) {
        try {
          const bounds = new window.google.maps.LatLngBounds();
          coords.forEach((c) => bounds.extend(c));
          mapRef.current.fitBounds(bounds);
        } catch (error) {
          console.error("Error setting map bounds:", error);
        }
      }
    }
  }, [activeUserLocations, mapReady, isMapInitialized]);

  // Handle marker click - opens ONLY the clicked marker
  const handleMarkerClick = (marker) => {
    // If clicking the same marker that's open, close it
    if (selectedMarkerId === marker.id) {
      setSelectedMarkerId(null);
      setSelectedUser(null);
    } else {
      // If clicking a different marker, close previous and open this one
      setSelectedMarkerId(marker.id);
      setSelectedUser(marker);
    }
    
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Handle InfoWindow close button click
  const handleInfoWindowClose = () => {
    setSelectedMarkerId(null);
    setSelectedUser(null);
  };

  // Handle user selection from list
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedMarkerId(user.id);
    
    if (user.lat && user.lng && isValidCoordinates(user.lat, user.lng)) {
      mapRef.current?.panTo({ lat: user.lat, lng: user.lng });
      mapRef.current?.setZoom(16);
    }

    if (isMobile) {
      setDrawerOpen(false);
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
    if (isMobile) {
      setDrawerOpen(!drawerOpen);
    } else {
      setShowUserList(!showUserList);
    }
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

  const validActiveUsers = activeUserLocations?.filter(user => 
    user.latestLocation && 
    isValidCoordinates(
      parseFloat(user.latestLocation.latitude),
      parseFloat(user.latestLocation.longitude)
    )
  ) || [];

  const invalidUsersCount = (activeUserLocations?.length || 0) - (validActiveUsers?.length || 0);

  const LoadingSpinner = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 1.5,
      }}
    >
      <CircularProgress size={32} sx={{ color: theme.palette.primary.main }} />
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
        Loading user locations...
      </Typography>
    </Box>
  );

  const MapControls = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'left 0.3s ease',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.2),
        }}
      >
        <Tooltip title="Zoom In">
          <IconButton
            onClick={handleZoomIn}
            size="small"
            sx={{
              borderRadius: 0,
              p: { xs: 0.8, sm: 1 },
              color: theme.palette.primary.main,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
            }}
          >
            <ZoomInIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton
            onClick={handleZoomOut}
            size="small"
            sx={{
              borderRadius: 0,
              p: { xs: 0.8, sm: 1 },
              color: theme.palette.primary.main,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
            }}
          >
            <ZoomOutIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fit All Markers">
          <IconButton
            onClick={handleFitBounds}
            size="small"
            sx={{
              borderRadius: 0,
              p: { xs: 0.8, sm: 1 },
              color: theme.palette.primary.main,
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
            }}
          >
            <MyLocationIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
          </IconButton>
        </Tooltip>
      </Paper>

      <Tooltip title="Refresh Data">
        <IconButton
          onClick={refreshData}
          disabled={isRefreshing}
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.2),
            color: theme.palette.primary.main,
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
            p: { xs: 0.8, sm: 1 },
          }}
        >
          <RefreshIcon sx={{ fontSize: { xs: 16, sm: 18 }, animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const UserList = ({ isDesktop }) => (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: isDesktop ? 280 : '100%',
    }}>
      <Box sx={{
        p: { xs: 1.5, sm: 2 },
        borderBottom: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: '#ffffff',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
            <Typography variant="subtitle2" fontWeight={600} color="#ffffff" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
              Active Users
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              label={validActiveUsers.length}
              size="small"
              sx={{
                bgcolor: '#ffffff',
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: '0.55rem', sm: '0.6rem' },
                height: { xs: 16, sm: 18 },
              }}
            />
            {invalidUsersCount > 0 && (
              <Tooltip title={`${invalidUsersCount} user(s) with invalid location`}>
                <Chip
                  label="!"
                  size="small"
                  sx={{
                    bgcolor: alpha('#ef4444', 0.2),
                    color: '#ef4444',
                    fontWeight: 600,
                    fontSize: { xs: '0.55rem', sm: '0.6rem' },
                    height: { xs: 16, sm: 18 },
                    minWidth: 20,
                  }}
                />
              </Tooltip>
            )}
            {isDesktop && (
              <Tooltip title="Hide List">
                <IconButton
                  size="small"
                  onClick={toggleUserList}
                  sx={{
                    color: '#ffffff',
                    width: { xs: 24, sm: 26 },
                    height: { xs: 24, sm: 26 },
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.1),
                    },
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        p: { xs: 1, sm: 1.2 },
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '2px',
        },
      }}>
        {activeUserLocationsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
          </Box>
        ) : validActiveUsers.length > 0 ? (
          <Stack spacing={1}>
            {validActiveUsers.map((user, index) => {
              const hasLocation = user.latestLocation?.latitude && user.latestLocation?.longitude &&
                isValidCoordinates(
                  parseFloat(user.latestLocation?.latitude),
                  parseFloat(user.latestLocation?.longitude)
                );
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
                    onClick={() => hasLocation && handleUserSelect({
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
                      p: { xs: 1, sm: 1.2 },
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
                      bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.05) : theme.palette.background.paper,
                      cursor: hasLocation ? 'pointer' : 'default',
                      opacity: hasLocation ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      '&:hover': hasLocation ? {
                        borderColor: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        transform: { xs: 'none', sm: 'translateX(-2px)' },
                      } : {},
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Box
                            sx={{
                              width: { xs: 7, sm: 8 },
                              height: { xs: 7, sm: 8 },
                              borderRadius: '50%',
                              bgcolor: hasLocation ? '#22c55e' : '#ef4444',
                              border: '1.5px solid #ffffff',
                            }}
                          />
                        }
                      >
                        <Avatar
                          sx={{
                            width: { xs: 28, sm: 32 },
                            height: { xs: 28, sm: 32 },
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                          }}
                        >
                          {user.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                        </Avatar>
                      </Badge>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                          {user.email}
                        </Typography>
                        {user.latestLocation?.timestamp && (
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' }, display: 'flex', alignItems: 'center', gap: 0.3, mt: 0.2 }}>
                            <TimeIcon sx={{ fontSize: { xs: 7, sm: 8 }, color: theme.palette.primary.main }} />
                            {formatTime(user.latestLocation.timestamp)}
                          </Typography>
                        )}
                      </Box>
                      {hasLocation && (
                        <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 14 } }} />
                      )}
                    </Box>
                  </Paper>
                </motion.div>
              );
            })}
          </Stack>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <PersonIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
              {activeUserLocations?.length > 0 ? 'No valid location data available' : 'No active users found'}
            </Typography>
            {activeUserLocations?.length > 0 && invalidUsersCount > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, display: 'block', mt: 0.5 }}>
                ({invalidUsersCount} user(s) have invalid location coordinates)
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <Box sx={{
        p: { xs: 1, sm: 1.2 },
        borderTop: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        bgcolor: alpha(theme.palette.primary.main, 0.05),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Refresh">
            <IconButton
              size="small"
              onClick={refreshData}
              disabled={isRefreshing}
              sx={{ color: theme.palette.primary.main, width: { xs: 26, sm: 28 }, height: { xs: 26, sm: 28 } }}
            >
              <RefreshIcon sx={{ fontSize: { xs: 14, sm: 16 }, animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, ml: 0.5 }}>
            {coordinates.length} on map
          </Typography>
        </Box>

        {isMobile && (
          <Tooltip title="Close">
            <IconButton
              size="small"
              onClick={toggleUserList}
              sx={{ color: theme.palette.primary.main, width: 26, height: 26 }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  if (loadError) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper, p: 1.5 }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 6 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: { xs: 1.5, sm: 2.5 },
              textAlign: "center",
              border: "1px solid",
              borderColor: alpha("#ef4444", 0.2),
            }}
          >
            <LocationIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: alpha("#ef4444", 0.3), mb: 1.5 }} />
            <Typography variant="h6" color="#ef4444" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Error loading maps
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
              Please check your internet connection
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper, p: 1.5 }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 6 } }}>
          <LoadingSpinner />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper, display: 'flex', flexDirection: 'column' }}>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          padding: { xs: '6px 12px', sm: '8px 16px' },
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton
          onClick={handleBack}
          size="small"
          sx={{
            color: theme.palette.primary.main,
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
        </IconButton>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Live User Locations
        </Typography>

        {isMobile && (
          <Box sx={{ ml: 'auto' }}>
            <Fab
              size="small"
              color="primary"
              onClick={toggleUserList}
              sx={{
                width: 36,
                height: 36,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              <PeopleIcon sx={{ fontSize: 18 }} />
            </Fab>
          </Box>
        )}
      </Box>

      <Box sx={{
        display: "flex",
        height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        position: 'relative',
      }}>
        <Box sx={{
          flex: 1,
          position: 'relative',
          height: '100%',
          transition: 'width 0.3s ease',
        }}>
          {!isMobile && !showUserList && (
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
                  p: 0.8,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: '#ffffff',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.3,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: 16 }} />
                <PeopleIcon sx={{ fontSize: 14 }} />
                <Chip
                  label={validActiveUsers.length}
                  size="small"
                  sx={{
                    bgcolor: '#ffffff',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '0.5rem',
                    height: 14,
                    minWidth: 14,
                    '& .MuiChip-label': { px: 0.5 }
                  }}
                />
              </Paper>
            </motion.div>
          )}

          <MapControls />

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
                    scaledSize: new window.google.maps.Size(isSmallMobile ? 24 : 28, isSmallMobile ? 24 : 28),
                  }}
                >
                  {/* ✅ ONLY show InfoWindow for the marker whose ID matches selectedMarkerId */}
                  {selectedMarkerId === coord.id && (
                    <InfoWindow 
                      onCloseClick={handleInfoWindowClose}
                      options={{ 
                        maxWidth: 250,
                        pixelOffset: new window.google.maps.Size(0, -30)
                      }}
                    >
                      <Box sx={{ maxWidth: { xs: 180, sm: 220 }, p: 0.3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                          <Avatar
                            sx={{
                              width: { xs: 24, sm: 28 },
                              height: { xs: 24, sm: 28 },
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              fontSize: { xs: '0.65rem', sm: '0.7rem' },
                            }}
                          >
                            {coord.name?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              {coord.name}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }} color="text.secondary">
                              {coord.email}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 0.5 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, mb: 0.3, flexWrap: 'wrap' }}>
                          <TimeIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 10, sm: 12 } }} />
                          <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                            {formatDate(coord.timestamp)} at {formatTime(coord.timestamp)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                          <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 10, sm: 12 } }} />
                          <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                            {coord.lat.toFixed(4)}, {coord.lng.toFixed(4)}
                          </Typography>
                        </Box>

                        {coord.image && (
                          <Box sx={{ mt: 0.8 }}>
                            <img
                              src={coord.image}
                              alt="Location"
                              style={{
                                width: '100%',
                                maxHeight: { xs: 80, sm: 100 },
                                objectFit: 'cover',
                                borderRadius: 4,
                              }}
                            />
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                          <IconButton
                            size="small"
                            onClick={handleInfoWindowClose}
                            sx={{
                              color: theme.palette.text.secondary,
                              '&:hover': { color: theme.palette.primary.main },
                              p: 0.5,
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 12 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>

          {activeUserLocationsLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.background.paper, 0.7),
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

        {!isMobile && showUserList && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 280,
              height: '100%',
              position: 'relative',
              zIndex: 10,
              backgroundColor: theme.palette.background.paper,
              borderLeft: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              overflow: 'hidden',
            }}
          >
            <UserList isDesktop={true} />
          </motion.div>
        )}

        {isMobile && (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleUserList}
            PaperProps={{
              sx: {
                width: '85%',
                maxWidth: 320,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                overflow: 'hidden',
              },
            }}
          >
            <UserList isDesktop={false} />
          </Drawer>
        )}
      </Box>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default ActiveUserLocations;