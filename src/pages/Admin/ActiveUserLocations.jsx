import { useEffect, useState, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
  Button,
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
import { getCurrentLocationsOfActiveUsers } from "../../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const GOOGLE_MAPS_APIKEY = import.meta.env.VITE_GOOGLE_MAP_APIKEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyBO02PT60O5rJxH4QuRQc_hmbtUjuTN3jI";

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Helper function to get user object from localStorage
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (e) {
    console.error('Error parsing stored user:', e);
  }
  return null;
};

// Helper function to get admin ID from localStorage or token
const getAdminId = () => {
  // Method 1: Try to get from localStorage user object
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const isSubAdmin = Number(parsedUser.role_id) === 3;

      if (isSubAdmin) {
        // For sub-admin, get parent admin ID
        const rawAdminId = parsedUser.adminId;
        if (rawAdminId) {
          return typeof rawAdminId === 'object'
            ? (rawAdminId._id || rawAdminId.id)
            : rawAdminId;
        }
      } else {
        // For regular admin, use their own ID
        return parsedUser._id || parsedUser.id;
      }
    }
  } catch (e) {
    console.error('Error parsing stored user for admin ID:', e);
  }

  // Method 2: Try to get from token
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.adminId) {
        return decoded.adminId;
      }
      if (decoded?.id) {
        return decoded.id;
      }
    }
  } catch (e) {
    console.error('Error getting admin ID from token:', e);
  }

  return null;
};

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
  const {
    currentActiveLocations,
    currentActiveLocationsLoading,
    currentActiveLocationsSummary
  } = useSelector((state) => state.user || {});

  const adminId = location.state?.adminId || getAdminId();

  const [coordinates, setCoordinates] = useState([]);
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

    L.tileLayer(`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${GOOGLE_MAPS_APIKEY}`, {
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
          const popupContent = `
            <div style="max-width: 220px; width: 100%; padding: 6px; border-radius: 8px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.1);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px; font-weight: 600; flex-shrink: 0;">
                  ${coord.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div style="overflow: hidden;">
                  <div style="font-size: 11px; font-weight: 700; color: #667eea; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${coord.name}</div>
                  <div style="font-size: 9px; color: #6b7280; display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <span style="width: 4px; height: 4px; border-radius: 50%; background: ${coord.isOnline !== false ? '#4ade80' : '#ef4444'}; display: inline-block; flex-shrink: 0;"></span>
                    ${coord.email || 'User'}
                  </div>
                </div>
              </div>
              <hr style="margin: 4px 0; border: none; border-top: 1px solid rgba(102, 126, 234, 0.1);" />
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px; font-size: 9px; font-weight: 500;">
                <span style="color: #667eea;">🕒</span> ${formatDate(coord.timestamp)} • ${formatTime(coord.timestamp)}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; font-size: 9px; font-family: monospace;">
                <span style="color: #667eea;">📍</span> ${coord.lat.toFixed(4)}, ${coord.lng.toFixed(4)}
              </div>
            </div>
          `;
          m.bindPopup(popupContent, { minWidth: 200, className: 'custom-popup' }).openPopup();
        });

        markersRef.current.set(coord.id, m);
      });

      if (coords.length > 0) {
        mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }, [currentActiveLocations, isMapInitialized]);

  // Handle marker click - opens ONLY the clicked marker
  const handleMarkerClick = (marker) => {
    if (selectedMarkerId === marker.id) {
      setSelectedMarkerId(null);
      setSelectedUser(null);
    } else {
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

  // Transform currentActiveLocations to match the expected format for UserList
  const transformedActiveUsers = currentActiveLocations?.map(item => ({
    userId: item.user?.userId,
    name: item.user?.name,
    email: item.user?.email,
    employeeId: item.user?.employeeId,
    profileImage: item.user?.profileImage,
    status: item.user?.status,
    latestLocation: item.currentLocation ? {
      _id: item.session?.sessionId,
      latitude: item.currentLocation.latitude,
      longitude: item.currentLocation.longitude,
      timestamp: item.currentLocation.timestamp,
      location_image: item.user?.profileImage,
      isOnline: item.currentLocation.isOnline,
    } : null,
    sessionStartTime: item.session?.startTime,
    trackerId: item.session?.sessionId,
  })) || [];

  const validActiveUsers = transformedActiveUsers.filter(user =>
    user.latestLocation &&
    isValidCoordinates(
      parseFloat(user.latestLocation.latitude),
      parseFloat(user.latestLocation.longitude)
    )
  );

  const invalidUsersCount = (transformedActiveUsers?.length || 0) - (validActiveUsers?.length || 0);

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
              Active Users ({currentActiveLocationsSummary?.usersWithTodayLocation || validActiveUsers.length})
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
        {currentActiveLocationsSummary && (
          <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.8), fontSize: '0.6rem', mt: 0.5, display: 'block' }}>
            {currentActiveLocationsSummary.totalActiveSessionsToday} active sessions • {currentActiveLocationsSummary.totalUsersUnderAdmin} total users
          </Typography>
        )}
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
        {currentActiveLocationsLoading ? (
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
                          src={user.profileImage}
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
                          {user.employeeId && (
                            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5, fontSize: '0.55rem' }}>
                              #{user.employeeId}
                            </Typography>
                          )}
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
              {transformedActiveUsers?.length > 0 ? 'No valid location data available' : 'No active users found'}
            </Typography>
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

          <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

          {currentActiveLocationsLoading && (
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