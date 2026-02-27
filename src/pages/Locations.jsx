import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  alpha,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Route as RouteIcon,
  Timeline as TimelineIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const leafletMapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";

const Locations = () => {
  const location = useLocation();
  const { locations } = location.state || {};
  const [coordinates, setCoordinates] = useState([]);
  const [rawCoordinates, setRawCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(14);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const mapRef = useRef(null);
  const rawMapRef = useRef(null);

  const leafletMapRef = useRef(null);
  const leafletMapInstance = useRef(null);
  const leafletPolylines = useRef([]);
  const leafletMarkers = useRef([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries: ["places"],
  });

  // Initialize Leaflet map
  const initLeafletMap = useCallback(() => {
    if (
      !leafletMapInstance.current &&
      leafletMapRef.current &&
      rawCoordinates.length > 0
    ) {
      const center = rawCoordinates[Math.floor(rawCoordinates.length / 2)];

      leafletMapInstance.current = L.map(leafletMapRef.current).setView(
        [center.lat, center.lng],
        14
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(leafletMapInstance.current);

      updateLeafletMap();
    }
  }, [rawCoordinates]);

  // Custom icons for Leaflet markers
  const createLeafletIcon = (label, color) => {
    return L.divIcon({
      html: `
      <div style="
        background-color: ${color};
        color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">
        ${label}
      </div>
    `,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  // Update the Leaflet map initialization
  const updateLeafletMap = useCallback(() => {
    if (!leafletMapInstance.current || rawCoordinates.length === 0) return;

    // Clear existing elements
    leafletPolylines.current.forEach((line) =>
      leafletMapInstance.current.removeLayer(line)
    );
    leafletMarkers.current.forEach((marker) =>
      leafletMapInstance.current.removeLayer(marker)
    );
    leafletPolylines.current = [];
    leafletMarkers.current = [];

    // Add polyline
    if (rawCoordinates.length > 1) {
      const polyline = L.polyline(
        rawCoordinates.map((coord) => [coord.lat, coord.lng]),
        {
          color: "#0f766e",
          weight: 4,
          lineJoin: "round",
        }
      ).addTo(leafletMapInstance.current);
      leafletPolylines.current.push(polyline);
    }

    // Add start marker
    if (rawCoordinates.length > 0) {
      const startCoord = rawCoordinates[0];
      const startMarker = L.marker([startCoord.lat, startCoord.lng], {
        icon: createLeafletIcon("S", "#22c55e"),
        riseOnHover: true,
      }).addTo(leafletMapInstance.current);

      startMarker.bindPopup(`
      <div style="font-weight: bold;">START POINT</div>
      <div>Lat: ${startCoord.lat.toFixed(6)}</div>
      <div>Lng: ${startCoord.lng.toFixed(6)}</div>
      ${
        startCoord.timestamp
          ? `<div>${new Date(startCoord.timestamp).toLocaleString()}</div>`
          : ""
      }
    `);

      leafletMarkers.current.push(startMarker);
    }

    // Add end marker
    if (rawCoordinates.length > 1) {
      const endCoord = rawCoordinates[rawCoordinates.length - 1];
      const endMarker = L.marker([endCoord.lat, endCoord.lng], {
        icon: createLeafletIcon("E", "#ef4444"),
        riseOnHover: true,
      }).addTo(leafletMapInstance.current);

      endMarker.bindPopup(`
      <div style="font-weight: bold;">END POINT</div>
      <div>Lat: ${endCoord.lat.toFixed(6)}</div>
      <div>Lng: ${endCoord.lng.toFixed(6)}</div>
      ${
        endCoord.timestamp
          ? `<div>${new Date(endCoord.timestamp).toLocaleString()}</div>`
          : ""
      }
    `);

      leafletMarkers.current.push(endMarker);
    }

    // Add image markers
    rawCoordinates.forEach((coord, index) => {
      if (coord.location_image) {
        const cameraIcon = L.divIcon({
          html: `
          <div style="
            background-color: white;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #0f766e;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          ">
            <img src="https://cdn-icons-png.freepik.com/512/609/609673.png" 
                 style="width: 16px; height: 16px;"/>
          </div>
        `,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 28],
        });

        const marker = L.marker([coord.lat, coord.lng], {
          icon: cameraIcon,
          riseOnHover: true,
        })
          .addTo(leafletMapInstance.current)
          .bindPopup(
            `
        <div style="text-align: center;">
          <img src="${coord.location_image}" 
               style="max-width: 200px; max-height: 150px; margin-bottom: 5px;"/>
          <div>Lat: ${coord.lat.toFixed(6)}</div>
          <div>Lng: ${coord.lng.toFixed(6)}</div>
          ${
            coord.timestamp
              ? `<div>${new Date(coord.timestamp).toLocaleString()}</div>`
              : ""
          }
        </div>
      `
          )
          .on("click", () => handleImageMarkerClick(coord, true, true));

        leafletMarkers.current.push(marker);
      }
    });

    // Fit bounds with padding
    if (rawCoordinates.length > 0) {
      const bounds = L.latLngBounds(
        rawCoordinates.map((coord) => [coord.lat, coord.lng])
      );
      leafletMapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [rawCoordinates]);

  // Initialize/update Leaflet map when data changes
  useEffect(() => {
    if (rawCoordinates.length > 0) {
      if (!leafletMapInstance.current) {
        initLeafletMap();
      } else {
        updateLeafletMap();
      }
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [rawCoordinates, initLeafletMap, updateLeafletMap]);

  const imageCoordinates = coordinates.filter((c) => c.location_image);
  const rawImageCoordinates = rawCoordinates.filter((c) => c.location_image);

  // Get icon configuration
  const getIconConfig = useCallback(
    (color, size = 32) => {
      if (!isLoaded) return undefined;

      return {
        url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size),
      };
    },
    [isLoaded]
  );

  // Get camera icon
  const getCameraIcon = useCallback(
    (size = 28) => {
      if (!isLoaded) return undefined;

      return {
        url: `https://cdn-icons-png.freepik.com/512/609/609673.png`,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size),
      };
    },
    [isLoaded]
  );

  const snapToRoads = async (rawCoords) => {
    if (!rawCoords || rawCoords.length === 0) return [];

    const chunkCoords = (coords, chunkSize = 100) => {
      const chunks = [];
      for (let i = 0; i < coords.length; i += chunkSize) {
        chunks.push(coords.slice(i, i + chunkSize));
      }
      return chunks;
    };

    const coordChunks = chunkCoords(rawCoords, 100);
    const allSnappedPoints = [];

    // First, identify all points with images
    const pointsWithImages = rawCoords.filter((coord) => coord.location_image);

    for (const chunk of coordChunks) {
      const path = chunk.map((coord) => `${coord.lat},${coord.lng}`).join("|");
      const url = `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
        path
      )}&interpolate=true&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.snappedPoints) {
          allSnappedPoints.push(...chunk);
        } else {
          // Create a map of original indices to their full data
          const originalMap = {};
          chunk.forEach((coord, index) => {
            originalMap[index] = coord;
          });

          const snapped = data.snappedPoints.map((point) => {
            const original = originalMap[point.originalIndex] || {};

            // Always preserve the original data for points with images
            if (original.location_image) {
              return {
                ...original,
                lat: point.location.latitude,
                lng: point.location.longitude,
              };
            }

            return {
              lat: point.location.latitude,
              lng: point.location.longitude,
              timestamp: original.timestamp || null,
              accuracy: original.accuracy || null,
              location_image: original.location_image || null,
              id:
                original.id ||
                `${point.location.latitude},${point.location.longitude}`,
            };
          });

          allSnappedPoints.push(...snapped);
        }
      } catch (err) {
        console.error("Failed to snap to roads:", err);
        allSnappedPoints.push(...chunk);
      }
    }

    // Now ensure all points with images are included
    pointsWithImages.forEach((imagePoint) => {
      const exists = allSnappedPoints.some(
        (point) =>
          point.id === imagePoint.id ||
          (point.lat === imagePoint.lat && point.lng === imagePoint.lng)
      );

      if (!exists) {
        // Find the closest position in the snapped points to insert this image point
        let minDistance = Infinity;
        let insertIndex = -1;

        for (let i = 0; i < allSnappedPoints.length; i++) {
          const distance = Math.sqrt(
            Math.pow(imagePoint.lat - allSnappedPoints[i].lat, 2) +
              Math.pow(imagePoint.lng - allSnappedPoints[i].lng, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            insertIndex = i;
          }
        }

        if (insertIndex !== -1) {
          allSnappedPoints.splice(insertIndex, 0, imagePoint);
        } else {
          allSnappedPoints.push(imagePoint);
        }
      }
    });

    return allSnappedPoints;
  };

  // Process locations and set coordinates
  useEffect(() => {
    const processCoordinates = async () => {
      if (isLoaded && locations?.length) {
        const rawCoords = locations
          .map((loc) => ({
            lat: parseFloat(loc.latitude),
            lng: parseFloat(loc.longitude),
            timestamp: loc.timestamp || loc.createdAt,
            accuracy: loc.accuracy,
            location_image: loc.location_image || null,
            id: loc._id,
          }))
          .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

        setRawCoordinates(rawCoords);
        const snappedCoords = await snapToRoads(rawCoords);
        setCoordinates(snappedCoords);

        if (rawCoords.length > 0) {
          const midIndex = Math.floor(rawCoords.length / 2);
          setMapCenter(rawCoords[midIndex]);

          try {
            const bounds = new window.google.maps.LatLngBounds();
            rawCoords.forEach((coord) => bounds.extend(coord));
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const latDiff = Math.abs(ne.lat() - sw.lat());
            const lngDiff = Math.abs(ne.lng() - sw.lng());
            const maxDiff = Math.max(latDiff, lngDiff);

            if (maxDiff > 0.1) setMapZoom(10);
            else if (maxDiff > 0.05) setMapZoom(12);
            else if (maxDiff > 0.01) setMapZoom(14);
            else setMapZoom(16);
          } catch (error) {
            console.error("Error calculating bounds:", error);
            setMapZoom(14);
          }
        }
      }
    };

    processCoordinates();
  }, [locations, isLoaded]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowRight") {
          setSelectedImageIndex(
            (selectedImageIndex + 1) % imageCoordinates.length
          );
        } else if (e.key === "ArrowLeft") {
          setSelectedImageIndex(
            (selectedImageIndex - 1 + imageCoordinates.length) %
              imageCoordinates.length
          );
        } else if (e.key === "Escape") {
          handleCloseInfoWindow();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, imageCoordinates.length]);

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (coordinates.length > 0 && isLoaded) {
        try {
          const bounds = new window.google.maps.LatLngBounds();
          coordinates.forEach((coord) => bounds.extend(coord));
          map.fitBounds(bounds);

          window.google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            () => {
              map.setZoom(Math.min(map.getZoom(), 16));
            }
          );
        } catch (error) {
          console.error("Error fitting bounds:", error);
        }
      }
    },
    [coordinates, isLoaded]
  );

  const handleRawMapLoad = useCallback(
    (map) => {
      rawMapRef.current = map;

      if (rawCoordinates.length > 0 && isLoaded) {
        try {
          const bounds = new window.google.maps.LatLngBounds();
          rawCoordinates.forEach((coord) => bounds.extend(coord));
          map.fitBounds(bounds);

          window.google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            () => {
              map.setZoom(Math.min(map.getZoom(), 16));
            }
          );
        } catch (error) {
          console.error("Error fitting bounds:", error);
        }
      }
    },
    [rawCoordinates, isLoaded]
  );

  const handleImageMarkerClick = (coord, isRawMap = false) => {
    const index = (isRawMap ? rawImageCoordinates : imageCoordinates).findIndex(
      (c) => c.id === coord.id
    );
    if (index !== -1) {
      setSelectedImageIndex({ index, isRawMap });
    }
  };

  const handleCloseInfoWindow = () => {
    setSelectedImageIndex(null);
  };

  if (loadError) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8fafc",
        }}
      >
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error loading maps
          </Typography>
          <Typography color="text.secondary">
            Please check your internet connection
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8fafc",
        }}
      >
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <CircularProgress sx={{ color: "#0f766e", mb: 2 }} />
          <Typography color="text.secondary">Loading Maps...</Typography>
        </Paper>
      </Box>
    );
  }

  const renderMap = (isRawMap = false) => {
    const coords = isRawMap ? rawCoordinates : coordinates;
    const imgCoords = isRawMap ? rawImageCoordinates : imageCoordinates;
    const currentSelectedIndex =
      selectedImageIndex?.isRawMap === isRawMap
        ? selectedImageIndex.index
        : null;

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={isRawMap ? handleRawMapLoad : handleMapLoad}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
          zoomControl: true,
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
        {/* Route Polyline */}
        {coords.length > 1 && (
          <Polyline
            path={coords}
            options={{
              strokeColor: isRawMap ? "#f59e0b" : "#0f766e",
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true,
              icons: [
                {
                  icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 3,
                    strokeColor: isRawMap ? "#f59e0b" : "#0f766e",
                  },
                  offset: "50%",
                  repeat: "100px",
                },
              ],
            }}
          />
        )}

        {/* Start Marker */}
        {coords.length > 0 && (
          <Marker
            position={coords[0]}
            title="Start Location"
            icon={getIconConfig("green")}
            label={{
              text: "START",
              className: "marker-label start-label",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        )}

        {/* End Marker */}
        {coords.length > 1 && (
          <Marker
            position={coords[coords.length - 1]}
            title="End Location"
            icon={getIconConfig("red")}
            label={{
              text: "END",
              className: "marker-label end-label",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        )}

        {/* Image Markers */}
        {coords.map(
          (coord, index) =>
            coord.location_image && (
              <Marker
                key={`${isRawMap ? "raw-" : ""}image-${coord.id || index}`}
                position={coord}
                icon={getCameraIcon()}
                clickable={true}
                onClick={() => handleImageMarkerClick(coord, isRawMap)}
              />
            )
        )}

        {currentSelectedIndex !== null && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleCloseInfoWindow}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleCloseInfoWindow();
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Prev Button */}
            <IconButton
              sx={{
                position: "absolute",
                left: 20,
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex({
                  index:
                    (currentSelectedIndex - 1 + imgCoords.length) %
                    imgCoords.length,
                  isRawMap,
                });
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            {/* Image */}
            <Box
              component="img"
              src={imgCoords[currentSelectedIndex].location_image}
              alt="Location fullscreen"
              sx={{
                maxWidth: "90%",
                maxHeight: "80%",
                objectFit: "contain",
              }}
            />

            {/* Timestamp */}
            {imgCoords[currentSelectedIndex]?.timestamp && (
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 20,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                {new Date(imgCoords[currentSelectedIndex].timestamp).toLocaleString()}
              </Typography>
            )}

            {/* Next Button */}
            <IconButton
              sx={{
                position: "absolute",
                right: 20,
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex({
                  index: (currentSelectedIndex + 1) % imgCoords.length,
                  isRawMap,
                });
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        )}
      </GoogleMap>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          color: "#1e293b",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => window.history.back()}
            sx={{
              color: "#0f766e",
              "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, color: "#0f766e", fontWeight: 600 }}>
            Route Tracking
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 0 }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 0,
                borderBottom: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                bgcolor: "#f8fafc",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RouteIcon sx={{ color: "#0f766e" }} />
                <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
                  Snapped to Roads (Google Roads API)
                </Typography>
              </Box>
            </Paper>
            {renderMap(false)}
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 0,
                borderBottom: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                bgcolor: "#f8fafc",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TimelineIcon sx={{ color: "#0f766e" }} />
                <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
                  Raw GPS Data (No API Cost)
                </Typography>
              </Box>
            </Paper>
            {renderMap(true)}
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 0,
                borderBottom: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                bgcolor: "#f8fafc",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ImageIcon sx={{ color: "#0f766e" }} />
                <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
                  OpenStreetMap (100% Free)
                </Typography>
              </Box>
            </Paper>
            <div ref={leafletMapRef} style={leafletMapContainerStyle} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Locations;