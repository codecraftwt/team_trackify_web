// import { useLocation } from "react-router-dom";
// import { useEffect, useState, useRef, useCallback } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   CircularProgress,
//   alpha,
//   AppBar,
//   Toolbar,
//   Grid,
//   Card,
//   CardContent,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon,
//   Close as CloseIcon,
//   Route as RouteIcon,
//   Timeline as TimelineIcon,
//   Image as ImageIcon,
// } from "@mui/icons-material";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   Polyline,
// } from "@react-google-maps/api";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const mapContainerStyle = {
//   width: "100%",
//   height: "50vh",
// };

// const leafletMapContainerStyle = {
//   width: "100%",
//   height: "50vh",
// };

// const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

// const Locations = () => {
//   const location = useLocation();
//   const { locations } = location.state || {};
//   const [coordinates, setCoordinates] = useState([]);
//   const [rawCoordinates, setRawCoordinates] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
//   const [mapZoom, setMapZoom] = useState(14);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const mapRef = useRef(null);
//   const rawMapRef = useRef(null);

//   const leafletMapRef = useRef(null);
//   const leafletMapInstance = useRef(null);
//   const leafletPolylines = useRef([]);
//   const leafletMarkers = useRef([]);

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_APIKEY,
//     libraries: ["places"],
//   });

//   // Initialize Leaflet map
//   const initLeafletMap = useCallback(() => {
//     if (
//       !leafletMapInstance.current &&
//       leafletMapRef.current &&
//       rawCoordinates.length > 0
//     ) {
//       const center = rawCoordinates[Math.floor(rawCoordinates.length / 2)];

//       leafletMapInstance.current = L.map(leafletMapRef.current).setView(
//         [center.lat, center.lng],
//         14
//       );

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 19,
//       }).addTo(leafletMapInstance.current);

//       updateLeafletMap();
//     }
//   }, [rawCoordinates]);

//   // Custom icons for Leaflet markers
//   const createLeafletIcon = (label, color) => {
//     return L.divIcon({
//       html: `
//       <div style="
//         background-color: ${color};
//         color: white;
//         border-radius: 50%;
//         width: 32px;
//         height: 32px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-weight: bold;
//         font-size: 12px;
//         border: 2px solid white;
//         box-shadow: 0 2px 5px rgba(0,0,0,0.3);
//       ">
//         ${label}
//       </div>
//     `,
//       className: "",
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//     });
//   };

//   // Update the Leaflet map initialization
//   const updateLeafletMap = useCallback(() => {
//     if (!leafletMapInstance.current || rawCoordinates.length === 0) return;

//     // Clear existing elements
//     leafletPolylines.current.forEach((line) =>
//       leafletMapInstance.current.removeLayer(line)
//     );
//     leafletMarkers.current.forEach((marker) =>
//       leafletMapInstance.current.removeLayer(marker)
//     );
//     leafletPolylines.current = [];
//     leafletMarkers.current = [];

//     // Add polyline
//     if (rawCoordinates.length > 1) {
//       const polyline = L.polyline(
//         rawCoordinates.map((coord) => [coord.lat, coord.lng]),
//         {
//           color: "#2563EB",
//           weight: 4,
//           lineJoin: "round",
//         }
//       ).addTo(leafletMapInstance.current);
//       leafletPolylines.current.push(polyline);
//     }

//     // Add start marker
//     if (rawCoordinates.length > 0) {
//       const startCoord = rawCoordinates[0];
//       const startMarker = L.marker([startCoord.lat, startCoord.lng], {
//         icon: createLeafletIcon("S", "#22c55e"),
//         riseOnHover: true,
//       }).addTo(leafletMapInstance.current);

//       startMarker.bindPopup(`
//       <div style="font-weight: bold;">START POINT</div>
//       <div>Lat: ${startCoord.lat.toFixed(6)}</div>
//       <div>Lng: ${startCoord.lng.toFixed(6)}</div>
//       ${
//         startCoord.timestamp
//           ? `<div>${new Date(startCoord.timestamp).toLocaleString()}</div>`
//           : ""
//       }
//     `);

//       leafletMarkers.current.push(startMarker);
//     }

//     // Add end marker
//     if (rawCoordinates.length > 1) {
//       const endCoord = rawCoordinates[rawCoordinates.length - 1];
//       const endMarker = L.marker([endCoord.lat, endCoord.lng], {
//         icon: createLeafletIcon("E", "#ef4444"),
//         riseOnHover: true,
//       }).addTo(leafletMapInstance.current);

//       endMarker.bindPopup(`
//       <div style="font-weight: bold;">END POINT</div>
//       <div>Lat: ${endCoord.lat.toFixed(6)}</div>
//       <div>Lng: ${endCoord.lng.toFixed(6)}</div>
//       ${
//         endCoord.timestamp
//           ? `<div>${new Date(endCoord.timestamp).toLocaleString()}</div>`
//           : ""
//       }
//     `);

//       leafletMarkers.current.push(endMarker);
//     }

//     // Add image markers
//     rawCoordinates.forEach((coord, index) => {
//       if (coord.location_image) {
//         const cameraIcon = L.divIcon({
//           html: `
//           <div style="
//             background-color: white;
//             border-radius: 50%;
//             width: 28px;
//             height: 28px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: 2px solid #2563EB;
//             box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//           ">
//             <img src="https://cdn-icons-png.freepik.com/512/609/609673.png" 
//                  style="width: 16px; height: 16px;"/>
//           </div>
//         `,
//           className: "",
//           iconSize: [28, 28],
//           iconAnchor: [14, 28],
//         });

//         const marker = L.marker([coord.lat, coord.lng], {
//           icon: cameraIcon,
//           riseOnHover: true,
//         })
//           .addTo(leafletMapInstance.current)
//           .bindPopup(
//             `
//         <div style="text-align: center;">
//           <img src="${coord.location_image}" 
//                style="max-width: 200px; max-height: 150px; margin-bottom: 5px;"/>
//           <div>Lat: ${coord.lat.toFixed(6)}</div>
//           <div>Lng: ${coord.lng.toFixed(6)}</div>
//           ${
//             coord.timestamp
//               ? `<div>${new Date(coord.timestamp).toLocaleString()}</div>`
//               : ""
//           }
//         </div>
//       `
//           )
//           .on("click", () => handleImageMarkerClick(coord, true, true));

//         leafletMarkers.current.push(marker);
//       }
//     });

//     // Fit bounds with padding
//     if (rawCoordinates.length > 0) {
//       const bounds = L.latLngBounds(
//         rawCoordinates.map((coord) => [coord.lat, coord.lng])
//       );
//       leafletMapInstance.current.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [rawCoordinates]);

//   // Initialize/update Leaflet map when data changes
//   useEffect(() => {
//     if (rawCoordinates.length > 0) {
//       if (!leafletMapInstance.current) {
//         initLeafletMap();
//       } else {
//         updateLeafletMap();
//       }
//     }

//     return () => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.remove();
//         leafletMapInstance.current = null;
//       }
//     };
//   }, [rawCoordinates, initLeafletMap, updateLeafletMap]);

//   const imageCoordinates = coordinates.filter((c) => c.location_image);
//   const rawImageCoordinates = rawCoordinates.filter((c) => c.location_image);

//   // Get icon configuration
//   const getIconConfig = useCallback(
//     (color, size = 32) => {
//       if (!isLoaded) return undefined;

//       return {
//         url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
//         scaledSize: new window.google.maps.Size(size, size),
//         anchor: new window.google.maps.Point(size / 2, size),
//       };
//     },
//     [isLoaded]
//   );

//   // Get camera icon
//   const getCameraIcon = useCallback(
//     (size = 28) => {
//       if (!isLoaded) return undefined;

//       return {
//         url: `https://cdn-icons-png.freepik.com/512/609/609673.png`,
//         scaledSize: new window.google.maps.Size(size, size),
//         anchor: new window.google.maps.Point(size / 2, size),
//       };
//     },
//     [isLoaded]
//   );

//   const snapToRoads = async (rawCoords) => {
//     if (!rawCoords || rawCoords.length === 0) return [];

//     const chunkCoords = (coords, chunkSize = 100) => {
//       const chunks = [];
//       for (let i = 0; i < coords.length; i += chunkSize) {
//         chunks.push(coords.slice(i, i + chunkSize));
//       }
//       return chunks;
//     };

//     const coordChunks = chunkCoords(rawCoords, 100);
//     const allSnappedPoints = [];

//     // First, identify all points with images
//     const pointsWithImages = rawCoords.filter((coord) => coord.location_image);

//     for (const chunk of coordChunks) {
//       const path = chunk.map((coord) => `${coord.lat},${coord.lng}`).join("|");
//       const url = `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
//         path
//       )}&interpolate=true&key=${GOOGLE_MAPS_APIKEY}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data.snappedPoints) {
//           allSnappedPoints.push(...chunk);
//         } else {
//           // Create a map of original indices to their full data
//           const originalMap = {};
//           chunk.forEach((coord, index) => {
//             originalMap[index] = coord;
//           });

//           const snapped = data.snappedPoints.map((point) => {
//             const original = originalMap[point.originalIndex] || {};

//             // Always preserve the original data for points with images
//             if (original.location_image) {
//               return {
//                 ...original,
//                 lat: point.location.latitude,
//                 lng: point.location.longitude,
//               };
//             }

//             return {
//               lat: point.location.latitude,
//               lng: point.location.longitude,
//               timestamp: original.timestamp || null,
//               accuracy: original.accuracy || null,
//               location_image: original.location_image || null,
//               id:
//                 original.id ||
//                 `${point.location.latitude},${point.location.longitude}`,
//             };
//           });

//           allSnappedPoints.push(...snapped);
//         }
//       } catch (err) {
//         console.error("Failed to snap to roads:", err);
//         allSnappedPoints.push(...chunk);
//       }
//     }

//     // Now ensure all points with images are included
//     pointsWithImages.forEach((imagePoint) => {
//       const exists = allSnappedPoints.some(
//         (point) =>
//           point.id === imagePoint.id ||
//           (point.lat === imagePoint.lat && point.lng === imagePoint.lng)
//       );

//       if (!exists) {
//         // Find the closest position in the snapped points to insert this image point
//         let minDistance = Infinity;
//         let insertIndex = -1;

//         for (let i = 0; i < allSnappedPoints.length; i++) {
//           const distance = Math.sqrt(
//             Math.pow(imagePoint.lat - allSnappedPoints[i].lat, 2) +
//               Math.pow(imagePoint.lng - allSnappedPoints[i].lng, 2)
//           );

//           if (distance < minDistance) {
//             minDistance = distance;
//             insertIndex = i;
//           }
//         }

//         if (insertIndex !== -1) {
//           allSnappedPoints.splice(insertIndex, 0, imagePoint);
//         } else {
//           allSnappedPoints.push(imagePoint);
//         }
//       }
//     });

//     return allSnappedPoints;
//   };

//   // Process locations and set coordinates
//   useEffect(() => {
//     const processCoordinates = async () => {
//       if (isLoaded && locations?.length) {
//         const rawCoords = locations
//           .map((loc) => ({
//             lat: parseFloat(loc.latitude),
//             lng: parseFloat(loc.longitude),
//             timestamp: loc.timestamp || loc.createdAt,
//             accuracy: loc.accuracy,
//             location_image: loc.location_image || null,
//             id: loc._id,
//           }))
//           .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

//         setRawCoordinates(rawCoords);
//         const snappedCoords = await snapToRoads(rawCoords);
//         setCoordinates(snappedCoords);

//         if (rawCoords.length > 0) {
//           const midIndex = Math.floor(rawCoords.length / 2);
//           setMapCenter(rawCoords[midIndex]);

//           try {
//             const bounds = new window.google.maps.LatLngBounds();
//             rawCoords.forEach((coord) => bounds.extend(coord));
//             const ne = bounds.getNorthEast();
//             const sw = bounds.getSouthWest();
//             const latDiff = Math.abs(ne.lat() - sw.lat());
//             const lngDiff = Math.abs(ne.lng() - sw.lng());
//             const maxDiff = Math.max(latDiff, lngDiff);

//             if (maxDiff > 0.1) setMapZoom(10);
//             else if (maxDiff > 0.05) setMapZoom(12);
//             else if (maxDiff > 0.01) setMapZoom(14);
//             else setMapZoom(16);
//           } catch (error) {
//             console.error("Error calculating bounds:", error);
//             setMapZoom(14);
//           }
//         }
//       }
//     };

//     processCoordinates();
//   }, [locations, isLoaded]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (selectedImageIndex !== null) {
//         if (e.key === "ArrowRight") {
//           setSelectedImageIndex(
//             (selectedImageIndex + 1) % imageCoordinates.length
//           );
//         } else if (e.key === "ArrowLeft") {
//           setSelectedImageIndex(
//             (selectedImageIndex - 1 + imageCoordinates.length) %
//               imageCoordinates.length
//           );
//         } else if (e.key === "Escape") {
//           handleCloseInfoWindow();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedImageIndex, imageCoordinates.length]);

//   const handleMapLoad = useCallback(
//     (map) => {
//       mapRef.current = map;

//       if (coordinates.length > 0 && isLoaded) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           coordinates.forEach((coord) => bounds.extend(coord));
//           map.fitBounds(bounds);

//           window.google.maps.event.addListenerOnce(
//             map,
//             "bounds_changed",
//             () => {
//               map.setZoom(Math.min(map.getZoom(), 16));
//             }
//           );
//         } catch (error) {
//           console.error("Error fitting bounds:", error);
//         }
//       }
//     },
//     [coordinates, isLoaded]
//   );

//   const handleRawMapLoad = useCallback(
//     (map) => {
//       rawMapRef.current = map;

//       if (rawCoordinates.length > 0 && isLoaded) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           rawCoordinates.forEach((coord) => bounds.extend(coord));
//           map.fitBounds(bounds);

//           window.google.maps.event.addListenerOnce(
//             map,
//             "bounds_changed",
//             () => {
//               map.setZoom(Math.min(map.getZoom(), 16));
//             }
//           );
//         } catch (error) {
//           console.error("Error fitting bounds:", error);
//         }
//       }
//     },
//     [rawCoordinates, isLoaded]
//   );

//   const handleImageMarkerClick = (coord, isRawMap = false) => {
//     const index = (isRawMap ? rawImageCoordinates : imageCoordinates).findIndex(
//       (c) => c.id === coord.id
//     );
//     if (index !== -1) {
//       setSelectedImageIndex({ index, isRawMap });
//     }
//   };

//   const handleCloseInfoWindow = () => {
//     setSelectedImageIndex(null);
//   };

//   if (loadError) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "#f8fafc",
//         }}
//       >
//         <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
//           <Typography variant="h5" color="error" gutterBottom>
//             Error loading maps
//           </Typography>
//           <Typography color="text.secondary">
//             Please check your internet connection
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "#f8fafc",
//         }}
//       >
//         <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
//           <CircularProgress sx={{ color: "#2563EB", mb: 2 }} />
//           <Typography color="text.secondary">Loading Maps...</Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   const renderMap = (isRawMap = false) => {
//     const coords = isRawMap ? rawCoordinates : coordinates;
//     const imgCoords = isRawMap ? rawImageCoordinates : imageCoordinates;
//     const currentSelectedIndex =
//       selectedImageIndex?.isRawMap === isRawMap
//         ? selectedImageIndex.index
//         : null;

//     return (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         onLoad={isRawMap ? handleRawMapLoad : handleMapLoad}
//         center={mapCenter}
//         zoom={mapZoom}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: true,
//           fullscreenControl: true,
//           zoomControl: true,
//           scaleControl: true,
//           styles: [
//             {
//               featureType: "poi",
//               elementType: "labels",
//               stylers: [{ visibility: "off" }],
//             },
//           ],
//         }}
//       >
//         {/* Route Polyline */}
//         {coords.length > 1 && (
//           <Polyline
//             path={coords}
//             options={{
//               strokeColor: isRawMap ? "#f59e0b" : "#2563EB",
//               strokeOpacity: 0.8,
//               strokeWeight: 4,
//               geodesic: true,
//               icons: [
//                 {
//                   icon: {
//                     path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                     scale: 3,
//                     strokeColor: isRawMap ? "#f59e0b" : "#2563EB",
//                   },
//                   offset: "50%",
//                   repeat: "100px",
//                 },
//               ],
//             }}
//           />
//         )}

//         {/* Start Marker */}
//         {coords.length > 0 && (
//           <Marker
//             position={coords[0]}
//             title="Start Location"
//             icon={getIconConfig("green")}
//             label={{
//               text: "START",
//               className: "marker-label start-label",
//               color: "white",
//               fontSize: "12px",
//               fontWeight: "bold",
//             }}
//           />
//         )}

//         {/* End Marker */}
//         {coords.length > 1 && (
//           <Marker
//             position={coords[coords.length - 1]}
//             title="End Location"
//             icon={getIconConfig("red")}
//             label={{
//               text: "END",
//               className: "marker-label end-label",
//               color: "white",
//               fontSize: "12px",
//               fontWeight: "bold",
//             }}
//           />
//         )}

//         {/* Image Markers */}
//         {coords.map(
//           (coord, index) =>
//             coord.location_image && (
//               <Marker
//                 key={`${isRawMap ? "raw-" : ""}image-${coord.id || index}`}
//                 position={coord}
//                 icon={getCameraIcon()}
//                 clickable={true}
//                 onClick={() => handleImageMarkerClick(coord, isRawMap)}
//               />
//             )
//         )}

//         {currentSelectedIndex !== null && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               bgcolor: "rgba(0,0,0,0.9)",
//               zIndex: 9999,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onClick={handleCloseInfoWindow}
//           >
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 top: 20,
//                 right: 20,
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleCloseInfoWindow();
//               }}
//             >
//               <CloseIcon />
//             </IconButton>

//             {/* Prev Button */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 left: 20,
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImageIndex({
//                   index:
//                     (currentSelectedIndex - 1 + imgCoords.length) %
//                     imgCoords.length,
//                   isRawMap,
//                 });
//               }}
//             >
//               <ArrowBackIcon />
//             </IconButton>

//             {/* Image */}
//             <Box
//               component="img"
//               src={imgCoords[currentSelectedIndex].location_image}
//               alt="Location fullscreen"
//               sx={{
//                 maxWidth: "90%",
//                 maxHeight: "80%",
//                 objectFit: "contain",
//               }}
//             />

//             {/* Timestamp */}
//             {imgCoords[currentSelectedIndex]?.timestamp && (
//               <Typography
//                 sx={{
//                   position: "absolute",
//                   bottom: 20,
//                   color: "white",
//                   bgcolor: "rgba(0,0,0,0.5)",
//                   px: 2,
//                   py: 1,
//                   borderRadius: 2,
//                 }}
//               >
//                 {new Date(imgCoords[currentSelectedIndex].timestamp).toLocaleString()}
//               </Typography>
//             )}

//             {/* Next Button */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 right: 20,
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImageIndex({
//                   index: (currentSelectedIndex + 1) % imgCoords.length,
//                   isRawMap,
//                 });
//               }}
//             >
//               <ArrowForwardIcon />
//             </IconButton>
//           </Box>
//         )}
//       </GoogleMap>
//     );
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
//       <AppBar
//         position="static"
//         sx={{
//           bgcolor: "white",
//           color: "#1e293b",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//           borderBottom: "1px solid #e2e8f0",
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             onClick={() => window.history.back()}
//             sx={{
//               color: "#2563EB",
//               "&:hover": { bgcolor: alpha("#2563EB", 0.1) },
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ ml: 2, color: "#2563EB", fontWeight: 600 }}>
//             Route Tracking
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0 }}>
//         <Grid container spacing={0}>
//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha("#2563EB", 0.1),
//                 bgcolor: "#f8fafc",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <RouteIcon sx={{ color: "#2563EB" }} />
//                 <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
//                   Snapped to Roads (Google Roads API)
//                 </Typography>
//               </Box>
//             </Paper>
//             {renderMap(false)}
//           </Grid>

//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha("#2563EB", 0.1),
//                 bgcolor: "#f8fafc",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <TimelineIcon sx={{ color: "#2563EB" }} />
//                 <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
//                   Raw GPS Data (No API Cost)
//                 </Typography>
//               </Box>
//             </Paper>
//             {renderMap(true)}
//           </Grid>

//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha("#2563EB", 0.1),
//                 bgcolor: "#f8fafc",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <ImageIcon sx={{ color: "#2563EB" }} />
//                 <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
//                   OpenStreetMap (100% Free)
//                 </Typography>
//               </Box>
//             </Paper>
//             <div ref={leafletMapRef} style={leafletMapContainerStyle} />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Locations;











//////////////////////////////    Centralised Color     ///////////////////////////////


// import { useLocation } from "react-router-dom";
// import { useEffect, useState, useRef, useCallback } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   CircularProgress,
//   alpha,
//   AppBar,
//   Toolbar,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon,
//   Close as CloseIcon,
//   Route as RouteIcon,
//   Timeline as TimelineIcon,
//   Image as ImageIcon,
// } from "@mui/icons-material";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   Polyline,
// } from "@react-google-maps/api";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const mapContainerStyle = {
//   width: "100%",
//   height: "50vh",
// };

// const leafletMapContainerStyle = {
//   width: "100%",
//   height: "50vh",
// };

// const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const { locations } = location.state || {};
//   const [coordinates, setCoordinates] = useState([]);
//   const [rawCoordinates, setRawCoordinates] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
//   const [mapZoom, setMapZoom] = useState(14);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const mapRef = useRef(null);
//   const rawMapRef = useRef(null);

//   const leafletMapRef = useRef(null);
//   const leafletMapInstance = useRef(null);
//   const leafletPolylines = useRef([]);
//   const leafletMarkers = useRef([]);

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_APIKEY,
//     libraries: ["places"],
//   });

//   // Initialize Leaflet map
//   const initLeafletMap = useCallback(() => {
//     if (
//       !leafletMapInstance.current &&
//       leafletMapRef.current &&
//       rawCoordinates.length > 0
//     ) {
//       const center = rawCoordinates[Math.floor(rawCoordinates.length / 2)];

//       leafletMapInstance.current = L.map(leafletMapRef.current).setView(
//         [center.lat, center.lng],
//         14
//       );

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 19,
//       }).addTo(leafletMapInstance.current);

//       updateLeafletMap();
//     }
//   }, [rawCoordinates]);

//   // Custom icons for Leaflet markers
//   const createLeafletIcon = (label, color) => {
//     return L.divIcon({
//       html: `
//       <div style="
//         background-color: ${color};
//         color: white;
//         border-radius: 50%;
//         width: 32px;
//         height: 32px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-weight: bold;
//         font-size: 12px;
//         border: 2px solid white;
//         box-shadow: 0 2px 5px rgba(0,0,0,0.3);
//       ">
//         ${label}
//       </div>
//     `,
//       className: "",
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//     });
//   };

//   // Update the Leaflet map initialization
//   const updateLeafletMap = useCallback(() => {
//     if (!leafletMapInstance.current || rawCoordinates.length === 0) return;

//     // Clear existing elements
//     leafletPolylines.current.forEach((line) =>
//       leafletMapInstance.current.removeLayer(line)
//     );
//     leafletMarkers.current.forEach((marker) =>
//       leafletMapInstance.current.removeLayer(marker)
//     );
//     leafletPolylines.current = [];
//     leafletMarkers.current = [];

//     // Add polyline
//     if (rawCoordinates.length > 1) {
//       const polyline = L.polyline(
//         rawCoordinates.map((coord) => [coord.lat, coord.lng]),
//         {
//           color: theme.palette.primary.main,
//           weight: 4,
//           lineJoin: "round",
//         }
//       ).addTo(leafletMapInstance.current);
//       leafletPolylines.current.push(polyline);
//     }

//     // Add start marker
//     if (rawCoordinates.length > 0) {
//       const startCoord = rawCoordinates[0];
//       const startMarker = L.marker([startCoord.lat, startCoord.lng], {
//         icon: createLeafletIcon("S", "#22c55e"),
//         riseOnHover: true,
//       }).addTo(leafletMapInstance.current);

//       startMarker.bindPopup(`
//       <div style="font-weight: bold;">START POINT</div>
//       <div>Lat: ${startCoord.lat.toFixed(6)}</div>
//       <div>Lng: ${startCoord.lng.toFixed(6)}</div>
//       ${
//         startCoord.timestamp
//           ? `<div>${new Date(startCoord.timestamp).toLocaleString()}</div>`
//           : ""
//       }
//     `);

//       leafletMarkers.current.push(startMarker);
//     }

//     // Add end marker
//     if (rawCoordinates.length > 1) {
//       const endCoord = rawCoordinates[rawCoordinates.length - 1];
//       const endMarker = L.marker([endCoord.lat, endCoord.lng], {
//         icon: createLeafletIcon("E", "#ef4444"),
//         riseOnHover: true,
//       }).addTo(leafletMapInstance.current);

//       endMarker.bindPopup(`
//       <div style="font-weight: bold;">END POINT</div>
//       <div>Lat: ${endCoord.lat.toFixed(6)}</div>
//       <div>Lng: ${endCoord.lng.toFixed(6)}</div>
//       ${
//         endCoord.timestamp
//           ? `<div>${new Date(endCoord.timestamp).toLocaleString()}</div>`
//           : ""
//       }
//     `);

//       leafletMarkers.current.push(endMarker);
//     }

//     // Add image markers
//     rawCoordinates.forEach((coord, index) => {
//       if (coord.location_image) {
//         const cameraIcon = L.divIcon({
//           html: `
//           <div style="
//             background-color: white;
//             border-radius: 50%;
//             width: 28px;
//             height: 28px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: 2px solid ${theme.palette.primary.main};
//             box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//           ">
//             <img src="https://cdn-icons-png.freepik.com/512/609/609673.png" 
//                  style="width: 16px; height: 16px;"/>
//           </div>
//         `,
//           className: "",
//           iconSize: [28, 28],
//           iconAnchor: [14, 28],
//         });

//         const marker = L.marker([coord.lat, coord.lng], {
//           icon: cameraIcon,
//           riseOnHover: true,
//         })
//           .addTo(leafletMapInstance.current)
//           .bindPopup(
//             `
//         <div style="text-align: center;">
//           <img src="${coord.location_image}" 
//                style="max-width: 200px; max-height: 150px; margin-bottom: 5px;"/>
//           <div>Lat: ${coord.lat.toFixed(6)}</div>
//           <div>Lng: ${coord.lng.toFixed(6)}</div>
//           ${
//             coord.timestamp
//               ? `<div>${new Date(coord.timestamp).toLocaleString()}</div>`
//               : ""
//           }
//         </div>
//       `
//           )
//           .on("click", () => handleImageMarkerClick(coord, true, true));

//         leafletMarkers.current.push(marker);
//       }
//     });

//     // Fit bounds with padding
//     if (rawCoordinates.length > 0) {
//       const bounds = L.latLngBounds(
//         rawCoordinates.map((coord) => [coord.lat, coord.lng])
//       );
//       leafletMapInstance.current.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [rawCoordinates, theme.palette.primary.main]);

//   // Initialize/update Leaflet map when data changes
//   useEffect(() => {
//     if (rawCoordinates.length > 0) {
//       if (!leafletMapInstance.current) {
//         initLeafletMap();
//       } else {
//         updateLeafletMap();
//       }
//     }

//     return () => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.remove();
//         leafletMapInstance.current = null;
//       }
//     };
//   }, [rawCoordinates, initLeafletMap, updateLeafletMap]);

//   const imageCoordinates = coordinates.filter((c) => c.location_image);
//   const rawImageCoordinates = rawCoordinates.filter((c) => c.location_image);

//   // Get icon configuration
//   const getIconConfig = useCallback(
//     (color, size = 32) => {
//       if (!isLoaded) return undefined;

//       return {
//         url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
//         scaledSize: new window.google.maps.Size(size, size),
//         anchor: new window.google.maps.Point(size / 2, size),
//       };
//     },
//     [isLoaded]
//   );

//   // Get camera icon
//   const getCameraIcon = useCallback(
//     (size = 28) => {
//       if (!isLoaded) return undefined;

//       return {
//         url: `https://cdn-icons-png.freepik.com/512/609/609673.png`,
//         scaledSize: new window.google.maps.Size(size, size),
//         anchor: new window.google.maps.Point(size / 2, size),
//       };
//     },
//     [isLoaded]
//   );

//   const snapToRoads = async (rawCoords) => {
//     if (!rawCoords || rawCoords.length === 0) return [];

//     const chunkCoords = (coords, chunkSize = 100) => {
//       const chunks = [];
//       for (let i = 0; i < coords.length; i += chunkSize) {
//         chunks.push(coords.slice(i, i + chunkSize));
//       }
//       return chunks;
//     };

//     const coordChunks = chunkCoords(rawCoords, 100);
//     const allSnappedPoints = [];

//     // First, identify all points with images
//     const pointsWithImages = rawCoords.filter((coord) => coord.location_image);

//     for (const chunk of coordChunks) {
//       const path = chunk.map((coord) => `${coord.lat},${coord.lng}`).join("|");
//       const url = `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
//         path
//       )}&interpolate=true&key=${GOOGLE_MAPS_APIKEY}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data.snappedPoints) {
//           allSnappedPoints.push(...chunk);
//         } else {
//           // Create a map of original indices to their full data
//           const originalMap = {};
//           chunk.forEach((coord, index) => {
//             originalMap[index] = coord;
//           });

//           const snapped = data.snappedPoints.map((point) => {
//             const original = originalMap[point.originalIndex] || {};

//             // Always preserve the original data for points with images
//             if (original.location_image) {
//               return {
//                 ...original,
//                 lat: point.location.latitude,
//                 lng: point.location.longitude,
//               };
//             }

//             return {
//               lat: point.location.latitude,
//               lng: point.location.longitude,
//               timestamp: original.timestamp || null,
//               accuracy: original.accuracy || null,
//               location_image: original.location_image || null,
//               id:
//                 original.id ||
//                 `${point.location.latitude},${point.location.longitude}`,
//             };
//           });

//           allSnappedPoints.push(...snapped);
//         }
//       } catch (err) {
//         console.error("Failed to snap to roads:", err);
//         allSnappedPoints.push(...chunk);
//       }
//     }

//     // Now ensure all points with images are included
//     pointsWithImages.forEach((imagePoint) => {
//       const exists = allSnappedPoints.some(
//         (point) =>
//           point.id === imagePoint.id ||
//           (point.lat === imagePoint.lat && point.lng === imagePoint.lng)
//       );

//       if (!exists) {
//         // Find the closest position in the snapped points to insert this image point
//         let minDistance = Infinity;
//         let insertIndex = -1;

//         for (let i = 0; i < allSnappedPoints.length; i++) {
//           const distance = Math.sqrt(
//             Math.pow(imagePoint.lat - allSnappedPoints[i].lat, 2) +
//               Math.pow(imagePoint.lng - allSnappedPoints[i].lng, 2)
//           );

//           if (distance < minDistance) {
//             minDistance = distance;
//             insertIndex = i;
//           }
//         }

//         if (insertIndex !== -1) {
//           allSnappedPoints.splice(insertIndex, 0, imagePoint);
//         } else {
//           allSnappedPoints.push(imagePoint);
//         }
//       }
//     });

//     return allSnappedPoints;
//   };

//   // Process locations and set coordinates
//   useEffect(() => {
//     const processCoordinates = async () => {
//       if (isLoaded && locations?.length) {
//         const rawCoords = locations
//           .map((loc) => ({
//             lat: parseFloat(loc.latitude),
//             lng: parseFloat(loc.longitude),
//             timestamp: loc.timestamp || loc.createdAt,
//             accuracy: loc.accuracy,
//             location_image: loc.location_image || null,
//             id: loc._id,
//           }))
//           .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

//         setRawCoordinates(rawCoords);
//         const snappedCoords = await snapToRoads(rawCoords);
//         setCoordinates(snappedCoords);

//         if (rawCoords.length > 0) {
//           const midIndex = Math.floor(rawCoords.length / 2);
//           setMapCenter(rawCoords[midIndex]);

//           try {
//             const bounds = new window.google.maps.LatLngBounds();
//             rawCoords.forEach((coord) => bounds.extend(coord));
//             const ne = bounds.getNorthEast();
//             const sw = bounds.getSouthWest();
//             const latDiff = Math.abs(ne.lat() - sw.lat());
//             const lngDiff = Math.abs(ne.lng() - sw.lng());
//             const maxDiff = Math.max(latDiff, lngDiff);

//             if (maxDiff > 0.1) setMapZoom(10);
//             else if (maxDiff > 0.05) setMapZoom(12);
//             else if (maxDiff > 0.01) setMapZoom(14);
//             else setMapZoom(16);
//           } catch (error) {
//             console.error("Error calculating bounds:", error);
//             setMapZoom(14);
//           }
//         }
//       }
//     };

//     processCoordinates();
//   }, [locations, isLoaded]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (selectedImageIndex !== null) {
//         if (e.key === "ArrowRight") {
//           setSelectedImageIndex(
//             (selectedImageIndex + 1) % imageCoordinates.length
//           );
//         } else if (e.key === "ArrowLeft") {
//           setSelectedImageIndex(
//             (selectedImageIndex - 1 + imageCoordinates.length) %
//               imageCoordinates.length
//           );
//         } else if (e.key === "Escape") {
//           handleCloseInfoWindow();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedImageIndex, imageCoordinates.length]);

//   const handleMapLoad = useCallback(
//     (map) => {
//       mapRef.current = map;

//       if (coordinates.length > 0 && isLoaded) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           coordinates.forEach((coord) => bounds.extend(coord));
//           map.fitBounds(bounds);

//           window.google.maps.event.addListenerOnce(
//             map,
//             "bounds_changed",
//             () => {
//               map.setZoom(Math.min(map.getZoom(), 16));
//             }
//           );
//         } catch (error) {
//           console.error("Error fitting bounds:", error);
//         }
//       }
//     },
//     [coordinates, isLoaded]
//   );

//   const handleRawMapLoad = useCallback(
//     (map) => {
//       rawMapRef.current = map;

//       if (rawCoordinates.length > 0 && isLoaded) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           rawCoordinates.forEach((coord) => bounds.extend(coord));
//           map.fitBounds(bounds);

//           window.google.maps.event.addListenerOnce(
//             map,
//             "bounds_changed",
//             () => {
//               map.setZoom(Math.min(map.getZoom(), 16));
//             }
//           );
//         } catch (error) {
//           console.error("Error fitting bounds:", error);
//         }
//       }
//     },
//     [rawCoordinates, isLoaded]
//   );

//   const handleImageMarkerClick = (coord, isRawMap = false) => {
//     const index = (isRawMap ? rawImageCoordinates : imageCoordinates).findIndex(
//       (c) => c.id === coord.id
//     );
//     if (index !== -1) {
//       setSelectedImageIndex({ index, isRawMap });
//     }
//   };

//   const handleCloseInfoWindow = () => {
//     setSelectedImageIndex(null);
//   };

//   if (loadError) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//         }}
//       >
//         <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
//           <Typography variant="h5" color="error" gutterBottom>
//             Error loading maps
//           </Typography>
//           <Typography color="text.secondary">
//             Please check your internet connection
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//         }}
//       >
//         <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
//           <CircularProgress sx={{ color: theme.palette.primary.main, mb: 2 }} />
//           <Typography color="text.secondary">Loading Maps...</Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   const renderMap = (isRawMap = false) => {
//     const coords = isRawMap ? rawCoordinates : coordinates;
//     const imgCoords = isRawMap ? rawImageCoordinates : imageCoordinates;
//     const currentSelectedIndex =
//       selectedImageIndex?.isRawMap === isRawMap
//         ? selectedImageIndex.index
//         : null;

//     return (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         onLoad={isRawMap ? handleRawMapLoad : handleMapLoad}
//         center={mapCenter}
//         zoom={mapZoom}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: true,
//           fullscreenControl: true,
//           zoomControl: true,
//           scaleControl: true,
//           styles: [
//             {
//               featureType: "poi",
//               elementType: "labels",
//               stylers: [{ visibility: "off" }],
//             },
//           ],
//         }}
//       >
//         {/* Route Polyline */}
//         {coords.length > 1 && (
//           <Polyline
//             path={coords}
//             options={{
//               strokeColor: isRawMap ? theme.palette.secondary.main : theme.palette.primary.main,
//               strokeOpacity: 0.8,
//               strokeWeight: 4,
//               geodesic: true,
//               icons: [
//                 {
//                   icon: {
//                     path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                     scale: 3,
//                     strokeColor: isRawMap ? theme.palette.secondary.main : theme.palette.primary.main,
//                   },
//                   offset: "50%",
//                   repeat: "100px",
//                 },
//               ],
//             }}
//           />
//         )}

//         {/* Start Marker */}
//         {coords.length > 0 && (
//           <Marker
//             position={coords[0]}
//             title="Start Location"
//             icon={getIconConfig("green")}
//             label={{
//               text: "START",
//               className: "marker-label start-label",
//               color: "white",
//               fontSize: "12px",
//               fontWeight: "bold",
//             }}
//           />
//         )}

//         {/* End Marker */}
//         {coords.length > 1 && (
//           <Marker
//             position={coords[coords.length - 1]}
//             title="End Location"
//             icon={getIconConfig("red")}
//             label={{
//               text: "END",
//               className: "marker-label end-label",
//               color: "white",
//               fontSize: "12px",
//               fontWeight: "bold",
//             }}
//           />
//         )}

//         {/* Image Markers */}
//         {coords.map(
//           (coord, index) =>
//             coord.location_image && (
//               <Marker
//                 key={`${isRawMap ? "raw-" : ""}image-${coord.id || index}`}
//                 position={coord}
//                 icon={getCameraIcon()}
//                 clickable={true}
//                 onClick={() => handleImageMarkerClick(coord, isRawMap)}
//               />
//             )
//         )}

//         {currentSelectedIndex !== null && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               bgcolor: "rgba(0,0,0,0.9)",
//               zIndex: 9999,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onClick={handleCloseInfoWindow}
//           >
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 top: 20,
//                 right: 20,
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleCloseInfoWindow();
//               }}
//             >
//               <CloseIcon />
//             </IconButton>

//             {/* Prev Button */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 left: 20,
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImageIndex({
//                   index:
//                     (currentSelectedIndex - 1 + imgCoords.length) %
//                     imgCoords.length,
//                   isRawMap,
//                 });
//               }}
//             >
//               <ArrowBackIcon />
//             </IconButton>

//             {/* Image */}
//             <Box
//               component="img"
//               src={imgCoords[currentSelectedIndex].location_image}
//               alt="Location fullscreen"
//               sx={{
//                 maxWidth: "90%",
//                 maxHeight: "80%",
//                 objectFit: "contain",
//               }}
//             />

//             {/* Timestamp */}
//             {imgCoords[currentSelectedIndex]?.timestamp && (
//               <Typography
//                 sx={{
//                   position: "absolute",
//                   bottom: 20,
//                   color: "white",
//                   bgcolor: "rgba(0,0,0,0.5)",
//                   px: 2,
//                   py: 1,
//                   borderRadius: 2,
//                 }}
//               >
//                 {new Date(imgCoords[currentSelectedIndex].timestamp).toLocaleString()}
//               </Typography>
//             )}

//             {/* Next Button */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 right: 20,
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImageIndex({
//                   index: (currentSelectedIndex + 1) % imgCoords.length,
//                   isRawMap,
//                 });
//               }}
//             >
//               <ArrowForwardIcon />
//             </IconButton>
//           </Box>
//         )}
//       </GoogleMap>
//     );
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper }}>
//       <AppBar
//         position="static"
//         sx={{
//           bgcolor: theme.palette.background.paper,
//           color: "text.primary",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.divider, 0.5),
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             onClick={() => window.history.back()}
//             sx={{
//               color: theme.palette.primary.main,
//               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ ml: 2, fontSize: "1rem", color: theme.palette.primary.main, fontWeight: 600 }}>
//             Route Tracking
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0 }}>
//         <Grid container spacing={0}>
//           {/* <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <RouteIcon sx={{ color: theme.palette.primary.main }} />
//                 <Typography variant="subtitle1" fontWeight={600} color="text.primary">
//                   Snapped to Roads (Google Roads API)
//                 </Typography>
//               </Box>
//             </Paper>
//             {renderMap(false)}
//           </Grid>

//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <TimelineIcon sx={{ color: theme.palette.primary.main }} />
//                 <Typography variant="subtitle1" fontWeight={600} color="text.primary">
//                   Raw GPS Data (No API Cost)
//                 </Typography>
//               </Box>
//             </Paper>
//             {renderMap(true)}
//           </Grid> */}

//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <ImageIcon sx={{ color: theme.palette.primary.main }} />
//                 <Typography variant="subtitle1" fontWeight={600} fontSize={12} color="text.primary">
//                   OpenStreetMap (100% Free)
//                 </Typography>
//               </Box>
//             </Paper>
//             <div ref={leafletMapRef} style={leafletMapContainerStyle} />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Locations;














// import { useLocation } from "react-router-dom";
// import { useEffect, useState, useRef, useCallback } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   CircularProgress,
//   alpha,
//   AppBar,
//   Toolbar,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon,
//   Close as CloseIcon,
//   Route as RouteIcon,
//   Timeline as TimelineIcon,
//   Image as ImageIcon,
// } from "@mui/icons-material";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   Polyline,
// } from "@react-google-maps/api";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const mapContainerStyle = {
//   width: "100%",
//   height: "70vh",
// };

// const leafletMapContainerStyle = {
//   width: "100%",
//   height: "70vh",
// };

// const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const { locations } = location.state || {};
//   const [coordinates, setCoordinates] = useState([]);
//   const [rawCoordinates, setRawCoordinates] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
//   const [mapZoom, setMapZoom] = useState(14);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const mapRef = useRef(null);
//   const rawMapRef = useRef(null);

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const leafletMapRef = useRef(null);
//   const leafletMapInstance = useRef(null);
//   const leafletPolylines = useRef([]);
//   const leafletMarkers = useRef([]);

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_APIKEY,
//     libraries: ["places"],
//   });

//   // Initialize Leaflet map
//   const initLeafletMap = useCallback(() => {
//     if (
//       !leafletMapInstance.current &&
//       leafletMapRef.current &&
//       rawCoordinates.length > 0
//     ) {
//       const center = rawCoordinates[Math.floor(rawCoordinates.length / 2)];

//       leafletMapInstance.current = L.map(leafletMapRef.current).setView(
//         [center.lat, center.lng],
//         14
//       );

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 19,
//       }).addTo(leafletMapInstance.current);

//       updateLeafletMap();
//     }
//   }, [rawCoordinates]);

//   // Custom icons for Leaflet markers
//   const createLeafletIcon = (label, color, size = 28) => {
//     return L.divIcon({
//       html: `
//       <div style="
//         background-color: ${color};
//         color: white;
//         border-radius: 50%;
//         width: ${size}px;
//         height: ${size}px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-weight: bold;
//         font-size: ${size === 24 ? '10px' : '11px'};
//         border: 2px solid white;
//         box-shadow: 0 2px 5px rgba(0,0,0,0.3);
//       ">
//         ${label}
//       </div>
//     `,
//       className: "",
//       iconSize: [size, size],
//       iconAnchor: [size / 2, size],
//     });
//   };

//   // Update the Leaflet map initialization
//   const updateLeafletMap = useCallback(() => {
//     if (!leafletMapInstance.current || rawCoordinates.length === 0) return;

//     // Clear existing elements
//     leafletPolylines.current.forEach((line) =>
//       leafletMapInstance.current.removeLayer(line)
//     );
//     leafletMarkers.current.forEach((marker) =>
//       leafletMapInstance.current.removeLayer(marker)
//     );
//     leafletPolylines.current = [];
//     leafletMarkers.current = [];

//     // Add polyline
//     if (rawCoordinates.length > 1) {
//       const polyline = L.polyline(
//         rawCoordinates.map((coord) => [coord.lat, coord.lng]),
//         {
//           color: theme.palette.primary.main,
//           weight: 4,
//           lineJoin: "round",
//         }
//       ).addTo(leafletMapInstance.current);
//       leafletPolylines.current.push(polyline);
//     }

//     // Add start marker
//     if (rawCoordinates.length > 0) {
//       const startCoord = rawCoordinates[0];
//       const startMarker = L.marker([startCoord.lat, startCoord.lng], {
//         icon: createLeafletIcon("S", "#22c55e", isMobile ? 24 : 28),
//         riseOnHover: true,
//       }).addTo(leafletMapInstance.current);

//       startMarker.bindPopup(`
//       <div style="font-weight: bold; font-size: 12px;">START POINT</div>
//       <div style="font-size: 11px;">Lat: ${startCoord.lat.toFixed(6)}</div>
//       <div style="font-size: 11px;">Lng: ${startCoord.lng.toFixed(6)}</div>
//       ${
//         startCoord.timestamp
//           ? `<div style="font-size: 11px;">${new Date(startCoord.timestamp).toLocaleString()}</div>`
//           : ""
//       }
//     `);

//       leafletMarkers.current.push(startMarker);
//     }

//     // Add end marker
//     if (rawCoordinates.length > 1) {
//       const endCoord = rawCoordinates[rawCoordinates.length - 1];
//       const endMarker = L.marker([endCoord.lat, endCoord.lng], {
//         icon: createLeafletIcon("E", "#ef4444", isMobile ? 24 : 28),
//         riseOnHover: true,
//       }).addTo(leafletMapInstance.current);

//       endMarker.bindPopup(`
//       <div style="font-weight: bold; font-size: 12px;">END POINT</div>
//       <div style="font-size: 11px;">Lat: ${endCoord.lat.toFixed(6)}</div>
//       <div style="font-size: 11px;">Lng: ${endCoord.lng.toFixed(6)}</div>
//       ${
//         endCoord.timestamp
//           ? `<div style="font-size: 11px;">${new Date(endCoord.timestamp).toLocaleString()}</div>`
//           : ""
//       }
//     `);

//       leafletMarkers.current.push(endMarker);
//     }

//     // Add image markers
//     rawCoordinates.forEach((coord, index) => {
//       if (coord.location_image) {
//         const cameraIcon = L.divIcon({
//           html: `
//           <div style="
//             background-color: white;
//             border-radius: 50%;
//             width: ${isMobile ? 24 : 28}px;
//             height: ${isMobile ? 24 : 28}px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: 2px solid ${theme.palette.primary.main};
//             box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//           ">
//             <img src="https://cdn-icons-png.freepik.com/512/609/609673.png" 
//                  style="width: ${isMobile ? 12 : 16}px; height: ${isMobile ? 12 : 16}px;"/>
//           </div>
//         `,
//           className: "",
//           iconSize: [isMobile ? 24 : 28, isMobile ? 24 : 28],
//           iconAnchor: [isMobile ? 12 : 14, isMobile ? 24 : 28],
//         });

//         const marker = L.marker([coord.lat, coord.lng], {
//           icon: cameraIcon,
//           riseOnHover: true,
//         })
//           .addTo(leafletMapInstance.current)
//           .bindPopup(
//             `
//         <div style="text-align: center;">
//           <img src="${coord.location_image}" 
//                style="max-width: ${isMobile ? 150 : 200}px; max-height: ${isMobile ? 100 : 150}px; margin-bottom: 5px; border-radius: 4px;"/>
//           <div style="font-size: 11px;">Lat: ${coord.lat.toFixed(6)}</div>
//           <div style="font-size: 11px;">Lng: ${coord.lng.toFixed(6)}</div>
//           ${
//             coord.timestamp
//               ? `<div style="font-size: 11px;">${new Date(coord.timestamp).toLocaleString()}</div>`
//               : ""
//           }
//         </div>
//       `
//           )
//           .on("click", () => handleImageMarkerClick(coord, true, true));

//         leafletMarkers.current.push(marker);
//       }
//     });

//     // Fit bounds with padding
//     if (rawCoordinates.length > 0) {
//       const bounds = L.latLngBounds(
//         rawCoordinates.map((coord) => [coord.lat, coord.lng])
//       );
//       leafletMapInstance.current.fitBounds(bounds, { padding: [30, 30] });
//     }
//   }, [rawCoordinates, theme.palette.primary.main, isMobile]);

//   // Initialize/update Leaflet map when data changes
//   useEffect(() => {
//     if (rawCoordinates.length > 0) {
//       if (!leafletMapInstance.current) {
//         initLeafletMap();
//       } else {
//         updateLeafletMap();
//       }
//     }

//     return () => {
//       if (leafletMapInstance.current) {
//         leafletMapInstance.current.remove();
//         leafletMapInstance.current = null;
//       }
//     };
//   }, [rawCoordinates, initLeafletMap, updateLeafletMap]);

//   const imageCoordinates = coordinates.filter((c) => c.location_image);
//   const rawImageCoordinates = rawCoordinates.filter((c) => c.location_image);

//   // Get icon configuration
//   const getIconConfig = useCallback(
//     (color, size = 28) => {
//       if (!isLoaded) return undefined;

//       return {
//         url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
//         scaledSize: new window.google.maps.Size(size, size),
//         anchor: new window.google.maps.Point(size / 2, size),
//       };
//     },
//     [isLoaded]
//   );

//   // Get camera icon
//   const getCameraIcon = useCallback(
//     (size = 24) => {
//       if (!isLoaded) return undefined;

//       return {
//         url: `https://cdn-icons-png.freepik.com/512/609/609673.png`,
//         scaledSize: new window.google.maps.Size(size, size),
//         anchor: new window.google.maps.Point(size / 2, size),
//       };
//     },
//     [isLoaded]
//   );

//   const snapToRoads = async (rawCoords) => {
//     if (!rawCoords || rawCoords.length === 0) return [];

//     const chunkCoords = (coords, chunkSize = 100) => {
//       const chunks = [];
//       for (let i = 0; i < coords.length; i += chunkSize) {
//         chunks.push(coords.slice(i, i + chunkSize));
//       }
//       return chunks;
//     };

//     const coordChunks = chunkCoords(rawCoords, 100);
//     const allSnappedPoints = [];

//     // First, identify all points with images
//     const pointsWithImages = rawCoords.filter((coord) => coord.location_image);

//     for (const chunk of coordChunks) {
//       const path = chunk.map((coord) => `${coord.lat},${coord.lng}`).join("|");
//       const url = `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
//         path
//       )}&interpolate=true&key=${GOOGLE_MAPS_APIKEY}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data.snappedPoints) {
//           allSnappedPoints.push(...chunk);
//         } else {
//           // Create a map of original indices to their full data
//           const originalMap = {};
//           chunk.forEach((coord, index) => {
//             originalMap[index] = coord;
//           });

//           const snapped = data.snappedPoints.map((point) => {
//             const original = originalMap[point.originalIndex] || {};

//             // Always preserve the original data for points with images
//             if (original.location_image) {
//               return {
//                 ...original,
//                 lat: point.location.latitude,
//                 lng: point.location.longitude,
//               };
//             }

//             return {
//               lat: point.location.latitude,
//               lng: point.location.longitude,
//               timestamp: original.timestamp || null,
//               accuracy: original.accuracy || null,
//               location_image: original.location_image || null,
//               id:
//                 original.id ||
//                 `${point.location.latitude},${point.location.longitude}`,
//             };
//           });

//           allSnappedPoints.push(...snapped);
//         }
//       } catch (err) {
//         console.error("Failed to snap to roads:", err);
//         allSnappedPoints.push(...chunk);
//       }
//     }

//     // Now ensure all points with images are included
//     pointsWithImages.forEach((imagePoint) => {
//       const exists = allSnappedPoints.some(
//         (point) =>
//           point.id === imagePoint.id ||
//           (point.lat === imagePoint.lat && point.lng === imagePoint.lng)
//       );

//       if (!exists) {
//         // Find the closest position in the snapped points to insert this image point
//         let minDistance = Infinity;
//         let insertIndex = -1;

//         for (let i = 0; i < allSnappedPoints.length; i++) {
//           const distance = Math.sqrt(
//             Math.pow(imagePoint.lat - allSnappedPoints[i].lat, 2) +
//               Math.pow(imagePoint.lng - allSnappedPoints[i].lng, 2)
//           );

//           if (distance < minDistance) {
//             minDistance = distance;
//             insertIndex = i;
//           }
//         }

//         if (insertIndex !== -1) {
//           allSnappedPoints.splice(insertIndex, 0, imagePoint);
//         } else {
//           allSnappedPoints.push(imagePoint);
//         }
//       }
//     });

//     return allSnappedPoints;
//   };

//   // Process locations and set coordinates
//   useEffect(() => {
//     const processCoordinates = async () => {
//       if (isLoaded && locations?.length) {
//         const rawCoords = locations
//           .map((loc) => ({
//             lat: parseFloat(loc.latitude),
//             lng: parseFloat(loc.longitude),
//             timestamp: loc.timestamp || loc.createdAt,
//             accuracy: loc.accuracy,
//             location_image: loc.location_image || null,
//             id: loc._id,
//           }))
//           .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

//         setRawCoordinates(rawCoords);
//         const snappedCoords = await snapToRoads(rawCoords);
//         setCoordinates(snappedCoords);

//         if (rawCoords.length > 0) {
//           const midIndex = Math.floor(rawCoords.length / 2);
//           setMapCenter(rawCoords[midIndex]);

//           try {
//             const bounds = new window.google.maps.LatLngBounds();
//             rawCoords.forEach((coord) => bounds.extend(coord));
//             const ne = bounds.getNorthEast();
//             const sw = bounds.getSouthWest();
//             const latDiff = Math.abs(ne.lat() - sw.lat());
//             const lngDiff = Math.abs(ne.lng() - sw.lng());
//             const maxDiff = Math.max(latDiff, lngDiff);

//             if (maxDiff > 0.1) setMapZoom(10);
//             else if (maxDiff > 0.05) setMapZoom(12);
//             else if (maxDiff > 0.01) setMapZoom(14);
//             else setMapZoom(16);
//           } catch (error) {
//             console.error("Error calculating bounds:", error);
//             setMapZoom(14);
//           }
//         }
//       }
//     };

//     processCoordinates();
//   }, [locations, isLoaded]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (selectedImageIndex !== null) {
//         if (e.key === "ArrowRight") {
//           setSelectedImageIndex(
//             (selectedImageIndex + 1) % imageCoordinates.length
//           );
//         } else if (e.key === "ArrowLeft") {
//           setSelectedImageIndex(
//             (selectedImageIndex - 1 + imageCoordinates.length) %
//               imageCoordinates.length
//           );
//         } else if (e.key === "Escape") {
//           handleCloseInfoWindow();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedImageIndex, imageCoordinates.length]);

//   const handleMapLoad = useCallback(
//     (map) => {
//       mapRef.current = map;

//       if (coordinates.length > 0 && isLoaded) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           coordinates.forEach((coord) => bounds.extend(coord));
//           map.fitBounds(bounds);

//           window.google.maps.event.addListenerOnce(
//             map,
//             "bounds_changed",
//             () => {
//               map.setZoom(Math.min(map.getZoom(), 16));
//             }
//           );
//         } catch (error) {
//           console.error("Error fitting bounds:", error);
//         }
//       }
//     },
//     [coordinates, isLoaded]
//   );

//   const handleRawMapLoad = useCallback(
//     (map) => {
//       rawMapRef.current = map;

//       if (rawCoordinates.length > 0 && isLoaded) {
//         try {
//           const bounds = new window.google.maps.LatLngBounds();
//           rawCoordinates.forEach((coord) => bounds.extend(coord));
//           map.fitBounds(bounds);

//           window.google.maps.event.addListenerOnce(
//             map,
//             "bounds_changed",
//             () => {
//               map.setZoom(Math.min(map.getZoom(), 16));
//             }
//           );
//         } catch (error) {
//           console.error("Error fitting bounds:", error);
//         }
//       }
//     },
//     [rawCoordinates, isLoaded]
//   );

//   const handleImageMarkerClick = (coord, isRawMap = false) => {
//     const index = (isRawMap ? rawImageCoordinates : imageCoordinates).findIndex(
//       (c) => c.id === coord.id
//     );
//     if (index !== -1) {
//       setSelectedImageIndex({ index, isRawMap });
//     }
//   };

//   const handleCloseInfoWindow = () => {
//     setSelectedImageIndex(null);
//   };

//   if (loadError) {
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
//         <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", borderRadius: 2.5 }}>
//           <Typography variant="h6" color="error" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
//             Error loading maps
//           </Typography>
//           <Typography color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
//             Please check your internet connection
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   if (!isLoaded) {
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
//         <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center", borderRadius: 2.5 }}>
//           <CircularProgress size={32} sx={{ color: theme.palette.primary.main, mb: 1.5 }} />
//           <Typography color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>Loading Maps...</Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   const renderMap = (isRawMap = false) => {
//     const coords = isRawMap ? rawCoordinates : coordinates;
//     const imgCoords = isRawMap ? rawImageCoordinates : imageCoordinates;
//     const currentSelectedIndex =
//       selectedImageIndex?.isRawMap === isRawMap
//         ? selectedImageIndex.index
//         : null;

//     return (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         onLoad={isRawMap ? handleRawMapLoad : handleMapLoad}
//         center={mapCenter}
//         zoom={mapZoom}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: true,
//           fullscreenControl: true,
//           zoomControl: true,
//           scaleControl: true,
//           styles: [
//             {
//               featureType: "poi",
//               elementType: "labels",
//               stylers: [{ visibility: "off" }],
//             },
//           ],
//         }}
//       >
//         {/* Route Polyline */}
//         {coords.length > 1 && (
//           <Polyline
//             path={coords}
//             options={{
//               strokeColor: isRawMap ? theme.palette.secondary.main : theme.palette.primary.main,
//               strokeOpacity: 0.8,
//               strokeWeight: 4,
//               geodesic: true,
//               icons: [
//                 {
//                   icon: {
//                     path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                     scale: 3,
//                     strokeColor: isRawMap ? theme.palette.secondary.main : theme.palette.primary.main,
//                   },
//                   offset: "50%",
//                   repeat: "100px",
//                 },
//               ],
//             }}
//           />
//         )}

//         {/* Start Marker */}
//         {coords.length > 0 && (
//           <Marker
//             position={coords[0]}
//             title="Start Location"
//             icon={getIconConfig("green", isMobile ? 24 : 28)}
//             label={{
//               text: "START",
//               className: "marker-label start-label",
//               color: "white",
//               fontSize: isMobile ? "10px" : "11px",
//               fontWeight: "bold",
//             }}
//           />
//         )}

//         {/* End Marker */}
//         {coords.length > 1 && (
//           <Marker
//             position={coords[coords.length - 1]}
//             title="End Location"
//             icon={getIconConfig("red", isMobile ? 24 : 28)}
//             label={{
//               text: "END",
//               className: "marker-label end-label",
//               color: "white",
//               fontSize: isMobile ? "10px" : "11px",
//               fontWeight: "bold",
//             }}
//           />
//         )}

//         {/* Image Markers */}
//         {coords.map(
//           (coord, index) =>
//             coord.location_image && (
//               <Marker
//                 key={`${isRawMap ? "raw-" : ""}image-${coord.id || index}`}
//                 position={coord}
//                 icon={getCameraIcon(isMobile ? 20 : 24)}
//                 clickable={true}
//                 onClick={() => handleImageMarkerClick(coord, isRawMap)}
//               />
//             )
//         )}

//         {currentSelectedIndex !== null && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               bgcolor: "rgba(0,0,0,0.9)",
//               zIndex: 9999,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onClick={handleCloseInfoWindow}
//           >
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 top: { xs: 10, sm: 20 },
//                 right: { xs: 10, sm: 20 },
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 width: { xs: 32, sm: 40 },
//                 height: { xs: 32, sm: 40 },
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleCloseInfoWindow();
//               }}
//             >
//               <CloseIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//             </IconButton>

//             {/* Prev Button */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 left: { xs: 10, sm: 20 },
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 width: { xs: 32, sm: 40 },
//                 height: { xs: 32, sm: 40 },
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImageIndex({
//                   index:
//                     (currentSelectedIndex - 1 + imgCoords.length) %
//                     imgCoords.length,
//                   isRawMap,
//                 });
//               }}
//             >
//               <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//             </IconButton>

//             {/* Image */}
//             <Box
//               component="img"
//               src={imgCoords[currentSelectedIndex].location_image}
//               alt="Location fullscreen"
//               sx={{
//                 maxWidth: { xs: "85%", sm: "90%" },
//                 maxHeight: { xs: "70%", sm: "80%" },
//                 objectFit: "contain",
//                 borderRadius: 1,
//               }}
//             />

//             {/* Timestamp */}
//             {imgCoords[currentSelectedIndex]?.timestamp && (
//               <Typography
//                 sx={{
//                   position: "absolute",
//                   bottom: { xs: 10, sm: 20 },
//                   color: "white",
//                   bgcolor: "rgba(0,0,0,0.5)",
//                   px: { xs: 1, sm: 2 },
//                   py: { xs: 0.5, sm: 1 },
//                   borderRadius: 1.5,
//                   fontSize: { xs: '0.6rem', sm: '0.7rem' },
//                 }}
//               >
//                 {new Date(imgCoords[currentSelectedIndex].timestamp).toLocaleString()}
//               </Typography>
//             )}

//             {/* Next Button */}
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 right: { xs: 10, sm: 20 },
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 width: { xs: 32, sm: 40 },
//                 height: { xs: 32, sm: 40 },
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImageIndex({
//                   index: (currentSelectedIndex + 1) % imgCoords.length,
//                   isRawMap,
//                 });
//               }}
//             >
//               <ArrowForwardIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//             </IconButton>
//           </Box>
//         )}
//       </GoogleMap>
//     );
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper }}>
//       <AppBar
//         position="static"
//         sx={{
//           bgcolor: theme.palette.background.paper,
//           color: "text.primary",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.divider, 0.5),
//         }}
//       >
//         <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
//           <IconButton
//             onClick={() => window.history.back()}
//             sx={{
//               color: theme.palette.primary.main,
//               width: { xs: 32, sm: 40 },
//               height: { xs: 32, sm: 40 },
//               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//           </IconButton>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               ml: { xs: 1, sm: 2 }, 
//               fontSize: { xs: '0.9rem', sm: '1rem' }, 
//               color: theme.palette.primary.main, 
//               fontWeight: 600 
//             }}
//           >
//             Route Tracking
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: { xs: 0, sm: 2 } }}>
//         <Grid container spacing={0}>
//           {/* Google Maps - Snapped to Roads (Commented out) */}
//           {/* <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 1.5, sm: 2 },
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <RouteIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 18, sm: 20 } }} />
//                 <Typography variant="subtitle2" fontWeight={600} color="text.primary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//                   Snapped to Roads (Google Roads API)
//                 </Typography>
//               </Box>
//             </Paper>
//             {renderMap(false)}
//           </Grid>

//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 1.5, sm: 2 },
//                 borderRadius: 0,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <TimelineIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 18, sm: 20 } }} />
//                 <Typography variant="subtitle2" fontWeight={600} color="text.primary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//                   Raw GPS Data (No API Cost)
//                 </Typography>
//               </Box>
//             </Paper>
//             {renderMap(true)}
//           </Grid> */}

//           {/* OpenStreetMap - Currently Active */}
//           <Grid item xs={12}>
           
//             <div ref={leafletMapRef} style={leafletMapContainerStyle} />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Locations;




















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


import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
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
  Divider,
  Drawer,
  Fab,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Route as RouteIcon,
  Image as ImageIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Menu as MenuIcon,
  Photo as PhotoIcon,
  Info as InfoIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  DirectionsWalk as DirectionsWalkIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const leafletMapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "500px",
};

// Stop detection configuration
const STOP_CONFIG = {
  MIN_DURATION: 180000, // 3 minutes in milliseconds
  MAX_SPEED_KMH: 2, // Speed threshold to consider as stopped (km/h)
  GROUP_RADIUS_METERS: 50, // Radius to group nearby points
};

// Calculate distance between two coordinates in meters (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Calculate speed between two points (km/h)
const calculateSpeed = (point1, point2) => {
  const distance = calculateDistance(
    point1.latitude, point1.longitude,
    point2.latitude, point2.longitude
  );
  
  const time1 = new Date(point1.timestamp).getTime();
  const time2 = new Date(point2.timestamp).getTime();
  const durationHours = (time2 - time1) / (1000 * 60 * 60); // Convert to hours
  
  if (durationHours <= 0) return Infinity;
  
  return (distance / 1000) / durationHours; // Speed in km/h
};

// Detect stops from location points
const detectStops = (locations) => {
  if (!locations || locations.length < 2) return [];

  const stops = [];
  let currentStopPoints = [];
  let stopStartTime = null;
  
  for (let i = 1; i < locations.length; i++) {
    const prevPoint = locations[i - 1];
    const currPoint = locations[i];
    
    const speed = calculateSpeed(prevPoint, currPoint);
    const distance = calculateDistance(
      prevPoint.latitude, prevPoint.longitude,
      currPoint.latitude, currPoint.longitude
    );
    
    const timeDiff = new Date(currPoint.timestamp) - new Date(prevPoint.timestamp);
    
    // If moving slowly, consider as potential stop
    if (speed < STOP_CONFIG.MAX_SPEED_KMH && distance < STOP_CONFIG.GROUP_RADIUS_METERS) {
      if (currentStopPoints.length === 0) {
        // Start of a potential stop
        currentStopPoints.push(prevPoint);
        stopStartTime = new Date(prevPoint.timestamp);
      }
      currentStopPoints.push(currPoint);
    } else {
      // Movement detected, check if we have a valid stop
      if (currentStopPoints.length > 1) {
        const stopEndTime = new Date(prevPoint.timestamp);
        const stopDuration = stopEndTime - stopStartTime;
        
        if (stopDuration >= STOP_CONFIG.MIN_DURATION) {
          // Calculate stop center (average of all points)
          const center = currentStopPoints.reduce(
            (acc, point) => {
              acc.lat += point.latitude;
              acc.lng += point.longitude;
              return acc;
            },
            { lat: 0, lng: 0 }
          );
          
          center.lat /= currentStopPoints.length;
          center.lng /= currentStopPoints.length;
          
          // Get images taken during stop
          const stopImages = currentStopPoints
            .filter(point => point.location_image)
            .map(point => ({
              url: point.location_image,
              timestamp: point.timestamp,
              location: { lat: point.latitude, lng: point.longitude }
            }));
          
          stops.push({
            id: `stop-${stopStartTime.getTime()}`,
            center,
            startTime: stopStartTime,
            endTime: stopEndTime,
            duration: stopDuration,
            pointCount: currentStopPoints.length,
            images: stopImages,
            points: currentStopPoints,
          });
        }
      }
      
      // Reset current stop
      currentStopPoints = [];
      stopStartTime = null;
    }
  }
  
  // Check for stop at the end
  if (currentStopPoints.length > 1) {
    const stopEndTime = new Date(locations[locations.length - 1].timestamp);
    const stopDuration = stopEndTime - stopStartTime;
    
    if (stopDuration >= STOP_CONFIG.MIN_DURATION) {
      const center = currentStopPoints.reduce(
        (acc, point) => {
          acc.lat += point.latitude;
          acc.lng += point.longitude;
          return acc;
        },
        { lat: 0, lng: 0 }
      );
      
      center.lat /= currentStopPoints.length;
      center.lng /= currentStopPoints.length;
      
      const stopImages = currentStopPoints
        .filter(point => point.location_image)
        .map(point => ({
          url: point.location_image,
          timestamp: point.timestamp,
          location: { lat: point.latitude, lng: point.longitude }
        }));
      
      stops.push({
        id: `stop-${stopStartTime.getTime()}`,
        center,
        startTime: stopStartTime,
        endTime: stopEndTime,
        duration: stopDuration,
        pointCount: currentStopPoints.length,
        images: stopImages,
        points: currentStopPoints,
      });
    }
  }
  
  return stops;
};

// Get all image locations
const getImageLocations = (locations) => {
  return locations
    .filter(loc => loc.location_image)
    .map((loc, index) => ({
      id: `img-${index}-${loc.timestamp}`,
      url: loc.location_image,
      timestamp: loc.timestamp,
      location: { lat: loc.latitude, lng: loc.longitude },
      accuracy: loc.accuracy,
    }));
};

const Locations = () => {
  const theme = useTheme();
  const location = useLocation();
  
  // Get data from location state
  const { 
    sessions = [], 
    summary = {}, 
    metadata = {} 
  } = location.state || {};
  
  const [allSessions, setAllSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [stops, setStops] = useState([]);
  const [imageLocations, setImageLocations] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showStops, setShowStops] = useState(true);
  const [showImages, setShowImages] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const mapRef = useRef(null);
  const leafletMapInstance = useRef(null);
  const leafletPolylines = useRef([]);
  const leafletMarkers = useRef([]);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Initialize sessions
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setAllSessions(sessions);
      // Select first session by default
      setSelectedSessionId(sessions[0]._id);
      setSelectedSession(sessions[0]);
    }
  }, [sessions]);

  // Process session data to detect stops and image locations
  useEffect(() => {
    if (selectedSession && selectedSession.locations) {
      // Detect stops
      const detectedStops = detectStops(selectedSession.locations);
      setStops(detectedStops);
      
      // Get all image locations
      const images = getImageLocations(selectedSession.locations);
      setImageLocations(images);
      
      // Update map with new data
      if (leafletMapInstance.current) {
        updateLeafletMap(selectedSession, detectedStops, images);
      }
    }
  }, [selectedSession]);

  // Get route points
  const getSessionRouteData = useCallback((session) => {
    if (!session || !session.locations || session.locations.length === 0) {
      return { 
        routePoints: [], 
        checkIn: null, 
        checkOut: null,
      };
    }
    
    const locations = session.locations;
    
    // Get all points for the route line
    const routePoints = locations.map(loc => ({
      lat: parseFloat(loc.latitude),
      lng: parseFloat(loc.longitude),
    }));
    
    // Check-in is first location
    const checkIn = locations[0];
    
    // Check-out is last location
    const checkOut = locations.length > 1 ? locations[locations.length - 1] : null;
    
    return {
      routePoints,
      checkIn,
      checkOut,
      totalLocations: locations.length,
    };
  }, []);

  // Handle session selection
  const handleSessionSelect = (sessionId) => {
    const session = allSessions.find(s => s._id === sessionId);
    setSelectedSessionId(sessionId);
    setSelectedSession(session);
    setSelectedStop(null);
    setSelectedImage(null);
  };

  // Create marker for check-in/out
  const createCheckMarker = (type, color, time, locationData) => {
    const size = isMobile ? 32 : 36;
    const icon = type === 'checkin' ? '🚀' : '🏁';
    const label = type === 'checkin' ? 'IN' : 'OUT';
    const hasImage = locationData?.location_image ? '📸' : '';
    
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${color};
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: ${size/3.5}px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            z-index: 2;
          ">
            <span style="font-size: ${size/3}px; line-height: 1;">${icon}</span>
            <span style="font-size: ${size/6}px; line-height: 1; margin-top: 1px;">${label}</span>
          </div>
          <div style="
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0,0,0,0.9);
            color: white;
            padding: 2px 6px;
            border-radius: 12px;
            font-size: 9px;
            white-space: nowrap;
            border: 1px solid ${color};
            z-index: 1;
          ">
            ${time} ${hasImage}
          </div>
        </div>
      `,
      className: "",
      iconSize: [size, size + 24],
      iconAnchor: [size/2, size + 12],
    });
  };

  // Create marker for stop
  const createStopMarker = (stop, index) => {
    const size = isMobile ? 36 : 40;
    const duration = Math.round(stop.duration / 60000); // minutes
    const imageCount = stop.images.length;
    
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #FF9800;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: ${size/3}px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            z-index: 2;
            animation: pulse 2s infinite;
          ">
            <span style="font-size: ${size/3}px;">⏸️</span>
            <span style="font-size: ${size/6}px; line-height: 1; margin-top: 1px;">STOP</span>
          </div>
          <div style="
            position: absolute;
            bottom: -24px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0,0,0,0.9);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 9px;
            white-space: nowrap;
            border: 1px solid #FF9800;
            z-index: 1;
          ">
            ${duration} min ${imageCount > 0 ? `• ${imageCount} 📸` : ''}
          </div>
        </div>
      `,
      className: "",
      iconSize: [size, size + 28],
      iconAnchor: [size/2, size + 14],
    });
  };

  // Create marker for image
  const createImageMarker = (image, index) => {
    const size = isMobile ? 28 : 32;
    
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #9C27B0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: ${size/2}px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            z-index: 2;
            cursor: pointer;
          ">
            📸
          </div>
          <div style="
            position: absolute;
            bottom: -16px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0,0,0,0.8);
            color: white;
            padding: 2px 4px;
            border-radius: 8px;
            font-size: 7px;
            white-space: nowrap;
            z-index: 1;
          ">
            Photo ${index + 1}
          </div>
        </div>
      `,
      className: "",
      iconSize: [size, size + 20],
      iconAnchor: [size/2, size + 10],
    });
  };

  // Update Leaflet map
  const updateLeafletMap = useCallback((session, stopsList, imagesList) => {
    if (!leafletMapInstance.current || !session) return;

    const { routePoints, checkIn, checkOut } = getSessionRouteData(session);
    
    if (routePoints.length === 0 || !checkIn) return;

    // Clear existing elements
    leafletPolylines.current.forEach((line) =>
      leafletMapInstance.current.removeLayer(line)
    );
    leafletMarkers.current.forEach((marker) =>
      leafletMapInstance.current.removeLayer(marker)
    );
    leafletPolylines.current = [];
    leafletMarkers.current = [];

    const routeColor = '#2196F3';

    // Add route polyline
    if (routePoints.length > 1) {
      const polyline = L.polyline(routePoints, {
        color: routeColor,
        weight: 4,
        opacity: 0.8,
        lineJoin: "round",
        lineCap: "round",
      }).addTo(leafletMapInstance.current);
      leafletPolylines.current.push(polyline);
    }

    // Format time for markers
    const formatMarkerTime = (timestamp) => {
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    // Add check-in marker
    const checkInMarker = L.marker(
      [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
      {
        icon: createCheckMarker(
          'checkin', 
          '#22c55e',
          formatMarkerTime(checkIn.timestamp || session.checkIn),
          checkIn
        ),
        riseOnHover: true,
        zIndexOffset: 1000,
      }
    ).addTo(leafletMapInstance.current);

    checkInMarker.bindPopup(`
      <div style="min-width: 180px;">
        <div style="font-weight: bold; color: #22c55e; margin-bottom: 5px;">🚀 CHECK-IN</div>
        <div><strong>Time:</strong> ${formatMarkerTime(checkIn.timestamp || session.checkIn)}</div>
        ${checkIn.location_image ? '<div style="margin-top: 5px;">📸 Has photo</div>' : ''}
      </div>
    `);
    leafletMarkers.current.push(checkInMarker);

    // Add check-out marker
    if (checkOut) {
      const checkOutMarker = L.marker(
        [parseFloat(checkOut.latitude), parseFloat(checkOut.longitude)],
        {
          icon: createCheckMarker(
            'checkout', 
            '#ef4444',
            formatMarkerTime(checkOut.timestamp || session.checkOut),
            checkOut
          ),
          riseOnHover: true,
          zIndexOffset: 1000,
        }
      ).addTo(leafletMapInstance.current);

      checkOutMarker.bindPopup(`
        <div style="min-width: 180px;">
          <div style="font-weight: bold; color: #ef4444; margin-bottom: 5px;">🏁 CHECK-OUT</div>
          <div><strong>Time:</strong> ${formatMarkerTime(checkOut.timestamp || session.checkOut)}</div>
          ${checkOut.location_image ? '<div style="margin-top: 5px;">📸 Has photo</div>' : ''}
        </div>
      `);
      leafletMarkers.current.push(checkOutMarker);
    }

    // Add stop markers if enabled
    if (showStops && stopsList.length > 0) {
      stopsList.forEach((stop, index) => {
        const stopMarker = L.marker(
          [stop.center.lat, stop.center.lng],
          {
            icon: createStopMarker(stop, index),
            riseOnHover: true,
          }
        ).addTo(leafletMapInstance.current);

        // Create popup with stop details and images
        let popupContent = `
          <div style="min-width: 200px; max-width: 250px;">
            <div style="font-weight: bold; color: #FF9800; margin-bottom: 8px;">⏸️ STOP DETECTED</div>
            <div><strong>Duration:</strong> ${Math.round(stop.duration / 60000)} minutes</div>
            <div><strong>Start:</strong> ${new Date(stop.startTime).toLocaleTimeString()}</div>
            <div><strong>End:</strong> ${new Date(stop.endTime).toLocaleTimeString()}</div>
            <div><strong>Points:</strong> ${stop.pointCount} locations</div>
        `;

        if (stop.images.length > 0) {
          popupContent += `<div style="margin-top: 8px;"><strong>Images:</strong></div>`;
          stop.images.forEach((img, i) => {
            popupContent += `
              <div style="margin-top: 5px; text-align: center;">
                <img src="${img.url}" 
                     style="max-width: 100%; max-height: 80px; border-radius: 4px; cursor: pointer;"
                     onclick="window.open('${img.url}', '_blank')"/>
              </div>
            `;
          });
        }

        popupContent += `</div>`;
        stopMarker.bindPopup(popupContent);
        
        stopMarker.on('click', () => {
          setSelectedStop(stop);
        });

        leafletMarkers.current.push(stopMarker);
      });
    }

    // Add image markers if enabled
    if (showImages && imagesList.length > 0) {
      imagesList.forEach((image, index) => {
        const imageMarker = L.marker(
          [image.location.lat, image.location.lng],
          {
            icon: createImageMarker(image, index),
            riseOnHover: true,
          }
        ).addTo(leafletMapInstance.current);

        imageMarker.bindPopup(`
          <div style="min-width: 200px; text-align: center;">
            <div style="font-weight: bold; color: #9C27B0; margin-bottom: 5px;">📸 PHOTO</div>
            <div><small>${new Date(image.timestamp).toLocaleString()}</small></div>
            <div style="margin-top: 5px;">
              <img src="${image.url}" 
                   style="max-width: 100%; max-height: 150px; border-radius: 4px; cursor: pointer;"
                   onclick="window.open('${image.url}', '_blank')"/>
            </div>
          </div>
        `);
        
        imageMarker.on('click', () => {
          setSelectedImage(image);
        });

        leafletMarkers.current.push(imageMarker);
      });
    }

    // Fit bounds to show all points
    const allPoints = [
      ...routePoints,
      ...(showStops ? stopsList.map(s => ({ lat: s.center.lat, lng: s.center.lng })) : []),
      ...(showImages ? imagesList.map(i => i.location) : []),
    ];
    
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      leafletMapInstance.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [isMobile, getSessionRouteData, showStops, showImages]);

  // Initialize map
  const initLeafletMap = useCallback(() => {
    if (!leafletMapInstance.current && mapRef.current && selectedSession) {
      const { checkIn } = getSessionRouteData(selectedSession);
      
      if (!checkIn) return;

      leafletMapInstance.current = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView(
        [parseFloat(checkIn.latitude), parseFloat(checkIn.longitude)],
        14
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(leafletMapInstance.current);

      updateLeafletMap(selectedSession, stops, imageLocations);
    }
  }, [selectedSession, getSessionRouteData, updateLeafletMap, stops, imageLocations]);

  // Update map when session or filters change
  useEffect(() => {
    if (selectedSession) {
      if (!leafletMapInstance.current) {
        initLeafletMap();
      } else {
        updateLeafletMap(selectedSession, stops, imageLocations);
      }
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [selectedSession, stops, imageLocations, showStops, showImages, initLeafletMap, updateLeafletMap]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // Session List Component
  const SessionList = () => (
    <Paper elevation={0} sx={{ height: '100%', overflow: 'auto', borderRadius: 0 }}>
      {/* Summary */}
      {summary && Object.keys(summary).length > 0 && (
        <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
          <Typography variant="body2" fontWeight={600} color="#2196F3" sx={{ fontSize: '0.75rem' }}>
            {summary.formattedDate || 'Selected Date'}
          </Typography>
          <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Sessions</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>{allSessions.length}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Stops</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>{stops.length}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Photos</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>{imageLocations.length}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ fontSize: '0.6rem' }} color="text.secondary">Distance</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.7rem' }}>
                {selectedSession?.totalDistance?.toFixed(1) || 0} km
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Filter Toggles */}
      <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
        <Stack direction="row" spacing={0.5}>
          <Chip
            size="small"
            label={`Stops (${stops.length})`}
            onClick={() => setShowStops(!showStops)}
            color={showStops ? "warning" : "default"}
            icon={<PauseIcon />}
            sx={{ height: 24, fontSize: '0.65rem' }}
          />
          <Chip
            size="small"
            label={`Photos (${imageLocations.length})`}
            onClick={() => setShowImages(!showImages)}
            color={showImages ? "secondary" : "default"}
            icon={<PhotoIcon />}
            sx={{ height: 24, fontSize: '0.65rem' }}
          />
        </Stack>
      </Box>

      {/* Sessions List */}
      <Box sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.75rem', mb: 1 }}>
          Sessions ({allSessions.length})
        </Typography>
        
        <Stack spacing={1}>
          {allSessions.map((session, index) => {
            const isSelected = selectedSessionId === session._id;
            const sessionStops = detectStops(session.locations || []);
            const sessionImages = getImageLocations(session.locations || []);
            
            return (
              <Card
                key={session._id}
                onClick={() => handleSessionSelect(session._id)}
                sx={{
                  cursor: 'pointer',
                  border: isSelected ? `1.5px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  bgcolor: isSelected ? alpha('#2196F3', 0.03) : 'transparent',
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#2196F3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {index + 1}
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                        Session #{index + 1}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                        {formatTime(session.checkIn)}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={0.5}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>Stops</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>{sessionStops.length}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>Photos</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>{sessionImages.length}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>Distance</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>{session.totalDistance?.toFixed(1)} km</Typography>
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

  // Mobile drawer
  const MobileDrawer = () => (
    <>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          display: { sm: 'none' },
          bgcolor: '#2196F3',
          width: 40,
          height: 40,
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon sx={{ fontSize: 20 }} />
      </Fab>
      
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { height: '75vh', borderTopLeftRadius: 12, borderTopRightRadius: 12 } }}
      >
        <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '0.85rem' }}>Sessions</Typography>
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => setDrawerOpen(false)}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <SessionList />
      </Drawer>
    </>
  );

  if (allSessions.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
          <InfoIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mb: 1 }} />
          <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>No Session Data</Typography>
          <Button variant="contained" size="small" onClick={() => window.history.back()} sx={{ mt: 1, fontSize: '0.7rem' }}>
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.paper }}>
      <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: '0 1px 5px rgba(0,0,0,0.05)' }}>
        <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: 1 }}>
          <IconButton onClick={() => window.history.back()} sx={{ color: '#2196F3', width: 28, height: 28 }}>
            <ArrowBackIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Typography sx={{ ml: 1, fontSize: '0.8rem', color: '#2196F3', fontWeight: 600 }}>
            {summary.formattedDate || 'Route Tracking'}
          </Typography>
          {selectedSession && (
            <Chip
              label={`Session ${allSessions.findIndex(s => s._id === selectedSessionId) + 1}`}
              size="small"
              sx={{ ml: 'auto', height: 20, bgcolor: alpha('#2196F3', 0.1), color: '#2196F3', fontSize: '0.6rem' }}
            />
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
        <Grid container sx={{ height: 'calc(100vh - 48px)' }}>
          <Grid item xs={12} md={8} sx={{ height: '100%', position: 'relative' }}>
            <div ref={mapRef} style={leafletMapContainerStyle} />
            
            {/* Info Overlay */}
            {selectedSession && (
              <Paper sx={{ position: 'absolute', top: 12, left: 12, p: 1, borderRadius: 1.5, maxWidth: 240 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#2196F3', fontSize: '0.7rem' }}>
                  Session #{allSessions.findIndex(s => s._id === selectedSessionId) + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>IN: {formatTime(selectedSession.checkIn)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>OUT: {selectedSession.checkOut ? formatTime(selectedSession.checkOut) : '—'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                  <Chip size="small" label={`${stops.length} stops`} sx={{ height: 16, fontSize: '0.55rem' }} />
                  <Chip size="small" label={`${imageLocations.length} photos`} sx={{ height: 16, fontSize: '0.55rem' }} />
                </Box>
              </Paper>
            )}
          </Grid>

          {!isMobile && (
            <Grid item md={4} sx={{ height: '100%', borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
              <SessionList />
            </Grid>
          )}
        </Grid>
      </Container>

      {isMobile && <MobileDrawer />}
    </Box>
  );
};

export default Locations;