const fs = require('fs');
const path = require('path');

const filePath = path.resolve('f:/dhiraj/Web/Inhouse/Team Trackify/team_trackify_web/src/pages/Admin/ActiveUserLocations.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace imports
content = content.replace(
`import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";`,
`import L from "leaflet";
import "leaflet/dist/leaflet.css";`
);

// 2. Remove libraries and adjust apiKey
content = content.replace(
`const libraries = ["places"];

// const GOOGLE_MAPS_APIKEY = "AIzaSyBv6Ti3tTDxmumh_GOFEtxBYRgGDWzZGz0";
const GOOGLE_MAPS_APIKEY = import.meta.env.VITE_GOOGLE_MAP_APIKEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyBO02PT60O5rJxH4QuRQc_hmbtUjuTN3jI";`,
`const GOOGLE_MAPS_APIKEY = import.meta.env.VITE_GOOGLE_MAP_APIKEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyBO02PT60O5rJxH4QuRQc_hmbtUjuTN3jI";`
);

// 3. Replace state variables and load logic (Lines 156-250 roughly)
// Use a regex to match from "const [mapCenter" to the end of the second useEffect hook "  }, [currentActiveLocations, mapReady, isMapInitialized]);"
const stateRegex = /const \[mapCenter.*\}, \[currentActiveLocations, mapReady, isMapInitialized\]\);/s;

const newStateCode = `const [coordinates, setCoordinates] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [showUserList, setShowUserList] = useState(!isMobile);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef(new Map());

  const handleBack = () => {
    navigate(-1);
  };

  const storedUser = getStoredUser();
  const isSubAdmin = Number(storedUser?.role_id) === 3;
  const effectiveAdminId = adminId || (isSubAdmin
    ? (typeof storedUser?.adminId === 'object' ? storedUser?.adminId?._id || storedUser?.adminId?.id : storedUser?.adminId)
    : (storedUser?._id || storedUser?.id));

  useEffect(() => {
    refreshData();
    setSelectedMarkerId(null);
    setSelectedUser(null);
  }, [dispatch, effectiveAdminId]);

  const refreshData = async () => {
    if (!effectiveAdminId) return;
    setIsRefreshing(true);
    setSelectedMarkerId(null);
    setSelectedUser(null);
    await dispatch(getCurrentLocationsOfActiveUsers(effectiveAdminId));
    setIsRefreshing(false);
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapRef.current || isMapInitialized) return;
    const map = L.map(mapRef.current, { zoomControl: false, center: [20.5937, 78.9629], zoom: 5 });
    
    L.tileLayer(\`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=\${GOOGLE_MAPS_APIKEY}\`, {
      attribution: "&copy; Google Maps",
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;
    setIsMapInitialized(true);
  }, [isMapInitialized]);

  // Clean up map on unmount
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Process user locations data from new API response
  useEffect(() => {
    if (currentActiveLocations?.length > 0 && isMapInitialized && mapInstance.current) {
      markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
      markersRef.current.clear();

      const validLocations = currentActiveLocations.filter(
        (item) =>
          item.currentLocation &&
          isValidCoordinates(
            parseFloat(item.currentLocation.latitude),
            parseFloat(item.currentLocation.longitude)
          )
      );

      if (validLocations.length === 0) return;

      const coords = validLocations.map((item) => ({
        lat: parseFloat(item.currentLocation.latitude),
        lng: parseFloat(item.currentLocation.longitude),
        id: item.session?.sessionId || item.user?.userId,
        userId: item.user?.userId,
        name: item.user?.name,
        email: item.user?.email,
        employeeId: item.user?.employeeId,
        image: item.user?.profileImage,
        timestamp: item.currentLocation?.timestamp,
        sessionStartTime: item.session?.startTime,
        isOnline: item.currentLocation?.isOnline,
      }));

      setCoordinates(coords);
      setSelectedMarkerId(null);
      setSelectedUser(null);

      const bounds = L.latLngBounds();

      coords.forEach((coord) => {
        bounds.extend([coord.lat, coord.lng]);
        const defaultImage = coord.image ? "https://cdn-icons-png.flaticon.com/512/447/447031.png" : "https://cdn-icons-png.flaticon.com/512/684/684908.png";
        
        const m = L.marker([coord.lat, coord.lng], {
          icon: L.icon({
            iconUrl: defaultImage,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })
        }).addTo(mapInstance.current);

        m.on('click', () => {
          handleMarkerClick(coord);
          const popupContent = \`
            <div style="max-width: 220px; width: 100%; padding: 6px; border-radius: 8px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.1);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px; font-weight: 600; flex-shrink: 0;">
                  \${coord.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div style="overflow: hidden;">
                  <div style="font-size: 11px; font-weight: 700; color: #667eea; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${coord.name}</div>
                  <div style="font-size: 9px; color: #6b7280; display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <span style="width: 4px; height: 4px; border-radius: 50%; background: \${coord.isOnline !== false ? '#4ade80' : '#ef4444'}; display: inline-block; flex-shrink: 0;"></span>
                    \${coord.email || 'User'}
                  </div>
                </div>
              </div>
              <hr style="margin: 4px 0; border: none; border-top: 1px solid rgba(102, 126, 234, 0.1);" />
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px; font-size: 9px; font-weight: 500;">
                <span style="color: #667eea;">🕒</span> \${formatDate(coord.timestamp)} • \${formatTime(coord.timestamp)}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; font-size: 9px; font-family: monospace;">
                <span style="color: #667eea;">📍</span> \${coord.lat.toFixed(4)}, \${coord.lng.toFixed(4)}
              </div>
            </div>
          \`;
          m.bindPopup(popupContent, { minWidth: 200, className: 'custom-popup' }).openPopup();
        });

        markersRef.current.set(coord.id, m);
      });

      if (coords.length > 0) {
        mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }, [currentActiveLocations, isMapInitialized]);`;

content = content.replace(stateRegex, newStateCode);

// 4. Update the interaction handlers
const interactionRegex = /  \/\/ Handle user selection from list.*?  const handleFitBounds = \(\) => \{.*?  \};\n/s;
const newInteractionCode = `  // Handle user selection from list
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedMarkerId(user.id);

    if (user.lat && user.lng && isValidCoordinates(user.lat, user.lng)) {
      mapInstance.current?.setView([user.lat, user.lng], 16);
      const marker = markersRef.current.get(user.id);
      if (marker) {
        marker.openPopup();
      }
    }

    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleZoomIn = () => {
    mapInstance.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstance.current?.zoomOut();
  };

  const handleFitBounds = () => {
    if (coordinates.length > 0 && mapInstance.current) {
      const bounds = L.latLngBounds(coordinates.map(c => [c.lat, c.lng]));
      mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
    }
  };
`;
content = content.replace(interactionRegex, newInteractionCode);

// 5. Remove loadError and !isLoaded components
const errorLoadingRegex = /  if \(loadError\) \{.*?  if \(\!isLoaded\) \{.*?  \}\n/s;
content = content.replace(errorLoadingRegex, "");

// 6. Replace <GoogleMap> with <div ref={mapRef}>
const googleMapRegex = /          <GoogleMap.*?          <\/GoogleMap>/s;
content = content.replace(googleMapRegex, `          <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />`);

fs.writeFileSync(filePath, content);
console.log('Successfully updated ActiveUserLocations.jsx for Leaflet');
