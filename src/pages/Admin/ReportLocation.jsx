import React, { useEffect, useState, useCallback, useRef } from "react";
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
    useTheme,
    useMediaQuery,
    CircularProgress,
    Divider,
    Modal,
    Fade,
    Button,
    Avatar,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Close as CloseIcon,
    Photo as PhotoIcon,
    Timer as TimerIcon,
    Straighten as StraightenIcon,
    Flag as FlagIcon,
    Start as StartIcon,
    PinDrop as PinDropIcon,
    Collections as CollectionsIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon,
    Info as InfoIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    DragIndicator as DragIndicatorIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    LocationOn as LocationOnIcon,
    PlayArrow as PlayArrowIcon,
    CameraAlt as CameraAltIcon,
} from "@mui/icons-material";
import { getSessionDetails } from "../../redux/slices/userSlice";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";

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

// ─── Clean Vector SVG Icons for Map Popups and Markers ────────────────────────
const SVG_ICONS = {
    start: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    startPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    end: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`,
    camera: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
    clock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    calendar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    pin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    chat: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    expand: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
};

// ─── Marker factories ──────────────────────────────────────────────────────────
const makeStartWithPhotoIcon = (photoUrl, time, size = 34) =>
    L.divIcon({
        html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #10b981, #059669);border-radius:50%;border:2.5px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.35);z-index:2;overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;bottom:2px;right:2px;background:#10b981;border-radius:50%;width:15px;height:15px;display:flex;align-items:center;justify-content:center;color:#fff;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.25);">
            ${SVG_ICONS.start}
          </div>
        </div>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:#0f172a;color:#f8fafc;padding:2px 7px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #10b981;z-index:1;font-weight:600;letter-spacing:0.3px;box-shadow:0 2px 5px rgba(0,0,0,0.3);display:flex;align-items:center;gap:3px;">
        <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#10b981;"></span>
        ${time} START
      </div>
    </div>`,
        className: "",
        iconSize: [size, size + 28],
        iconAnchor: [size / 2, size + 15],
    });

const makeEndWithPhotoIcon = (photoUrl, time, size = 34) =>
    L.divIcon({
        html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #ef4444, #dc2626);border-radius:50%;border:2.5px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.35);z-index:2;overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(239,68,68,0.2);display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;bottom:2px;right:2px;background:#ef4444;border-radius:50%;width:15px;height:15px;display:flex;align-items:center;justify-content:center;color:#fff;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.25);">
            ${SVG_ICONS.end}
          </div>
        </div>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:#0f172a;color:#f8fafc;padding:2px 7px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #ef4444;z-index:1;font-weight:600;letter-spacing:0.3px;box-shadow:0 2px 5px rgba(0,0,0,0.3);display:flex;align-items:center;gap:3px;">
        <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#ef4444;"></span>
        ${time} END
      </div>
    </div>`,
        className: "",
        iconSize: [size, size + 28],
        iconAnchor: [size / 2, size + 15],
    });

const makePhotoIcon = (photoUrl, time, size = 28) =>
    L.divIcon({
        html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\\'color:#fff;display:flex;align-items:center;justify-content:center;\\'>${SVG_ICONS.camera}</div>'"/>
        <div style="position:absolute;bottom:0;right:0;background:#f59e0b;border-radius:50%;width:13px;height:13px;display:flex;align-items:center;justify-content:center;color:#fff;border:1px solid #fff;">
          ${SVG_ICONS.camera}
        </div>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:1px 5px;border-radius:8px;font-size:7.5px;white-space:nowrap;border:1px solid #f59e0b;font-weight:600;">
        ${time}
      </div>
    </div>`,
        className: "",
        iconSize: [size, size + 20],
        iconAnchor: [size / 2, size + 10],
    });

const makeStartIcon = (color, time, size = 28) =>
    L.divIcon({
        html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;">
        <div style="display:flex;align-items:center;justify-content:center;width:14px;height:14px;">${SVG_ICONS.start}</div>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:1px 5px;border-radius:8px;font-size:7.5px;white-space:nowrap;border:1px solid ${color};z-index:1;font-weight:600;">
        ${time}
      </div>
    </div>`,
        className: "",
        iconSize: [size, size + 20],
        iconAnchor: [size / 2, size + 10],
    });

const makeEndIcon = (color, time, size = 28) =>
    L.divIcon({
        html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:2;">
        <div style="display:flex;align-items:center;justify-content:center;width:14px;height:14px;">${SVG_ICONS.end}</div>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:1px 5px;border-radius:8px;font-size:7.5px;white-space:nowrap;border:1px solid ${color};z-index:1;font-weight:600;">
        ${time}
      </div>
    </div>`,
        className: "",
        iconSize: [size, size + 20],
        iconAnchor: [size / 2, size + 10],
    });

const isSameLatLng = (lat1, lng1, lat2, lng2) =>
    Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

// ─── Draggable Photo Item ──────────────────────────────────────────────────────
const DraggablePhoto = ({ photo, index, onDragEnd, onPhotoClick, onFlyToLocation, isDragging, onDragStart }) => {
    const isStart = photo.type === "start";
    const isEnd = photo.type === "end";
    const borderColor = isStart ? "#10b981" : isEnd ? "#ef4444" : "#f59e0b";
    const hasValidLoc = photo.lat && photo.lng && photo.lat !== 0 && photo.lng !== 0;

    const handleClick = (e) => {
        e.stopPropagation();
        if (hasValidLoc) {
            onFlyToLocation(photo.lat, photo.lng, photo);
        } else {
            onPhotoClick(photo, index);
        }
    };

    return (
        <Box
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", index);
                e.dataTransfer.effectAllowed = "move";
                if (onDragStart) onDragStart(index);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
                if (onDragEnd && !isNaN(fromIndex) && fromIndex !== index) {
                    onDragEnd(fromIndex, index);
                }
            }}
            onClick={handleClick}
            sx={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 1.25,
                overflow: "hidden",
                cursor: hasValidLoc ? "pointer" : (isDragging ? "grabbing" : "grab"),
                border: `1.5px solid ${borderColor}`,
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
                opacity: isDragging ? 0.5 : 1,
                "&:hover": hasValidLoc ? {
                    transform: "scale(1.02)",
                    boxShadow: `0 2px 12px ${alpha(borderColor, 0.4)}`,
                } : {
                    transform: "scale(1.02)",
                    boxShadow: `0 2px 8px ${alpha(borderColor, 0.3)}`,
                },
                "&:active": { cursor: "grabbing" },
            }}
        >
            <img src={photo.url} alt={`Photo ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
            <Box sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: borderColor,
                color: "#fff",
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
            }}>
                {isStart ? (
                    <PlayArrowIcon sx={{ fontSize: 11 }} />
                ) : isEnd ? (
                    <FlagIcon sx={{ fontSize: 10 }} />
                ) : (
                    <CameraAltIcon sx={{ fontSize: 10 }} />
                )}
            </Box>
            {hasValidLoc && (
                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(15,23,42,0.75)", color: "white", fontSize: "7.5px", fontWeight: 500, textAlign: "center", py: 0.3, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 0.3 }}>
                    <LocationOnIcon sx={{ fontSize: 9 }} />
                    {fmtTime(photo.timestamp)}
                </Box>
            )}
            {!hasValidLoc && (
                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "rgba(15,23,42,0.75)", color: "white", fontSize: "7.5px", fontWeight: 500, textAlign: "center", py: 0.3, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 0.3 }}>
                    <DragIndicatorIcon sx={{ fontSize: 9 }} />
                    {fmtTime(photo.timestamp)}
                </Box>
            )}
        </Box>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const ReportLocation = () => {
    const theme = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { sessionId, userId, userName, userEmail, sessionData } = location.state || {};

    const sessionDetails = useSelector((state) => state.user?.sessionDetails);
    const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);

    // ── State ──────────────────────────────────────────────────────────────────
    const [selectedSession, setSelectedSession] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [hasLocations, setHasLocations] = useState(false);
    const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
    const [isMapInitialized, setIsMapInitialized] = useState(false);
    const [sessionPhotos, setSessionPhotos] = useState([]);
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sessionDate, setSessionDate] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mapZoom, setMapZoom] = useState(16);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLegendOpen, setIsLegendOpen] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // ── Refs ───────────────────────────────────────────────────────────────────
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const polylines = useRef([]);
    const markers = useRef([]);
    const markerRefs = useRef(new Map());
    const lastFitBoundsSessionId = useRef(null);

    // Show snackbar message
    const showMessage = (message, severity = "info") => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // Fly to location on map
    const flyToLocation = (lat, lng, photo) => {
        if (!mapInstance.current) {
            showMessage("Map not ready yet", "warning");
            return;
        }
        
        if (!lat || !lng || lat === 0 || lng === 0) {
            showMessage("No location data for this photo", "error");
            return;
        }
        
        // Fly to the location with animation
        mapInstance.current.flyTo([lat, lng], 18, {
            animate: true,
            duration: 1.2
        });
        
        // Show success message
        const photoType = photo.type === "start" ? "Start Point" : photo.type === "end" ? "End Point" : "Route Photo";
        showMessage(`📍 Flying to ${photoType}`, "success");
        
        // Try to open popup if marker exists
        setTimeout(() => {
            if (photo.key && markerRefs.current.has(photo.key)) {
                const marker = markerRefs.current.get(photo.key);
                marker.openPopup();
            }
        }, 1300);
    };

    // Fetch session details on mount
    useEffect(() => {
        if (sessionDetails && String(sessionDetails.sessionId) === String(sessionId)) {
            processSessionData(sessionDetails);
            setLoading(false);
        } else if (userId && sessionId) {
            dispatch(getSessionDetails({ userId, sessionId }));
        } else if (sessionData) {
            processSessionData(sessionData);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [dispatch, userId, sessionId, sessionData, sessionDetails]);

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

    // Process session data
    const processSessionData = useCallback((sessionData) => {
        if (!sessionData) return;
        setSelectedSession(sessionData);

        // Extract date from session
        if (sessionData.startTime) {
            setSessionDate(new Date(sessionData.startTime));
        }

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

        const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(sessionData);
        setStartPoint(sp);
        setEndPoint(ep);
        setSessionPhotos(buildSessionPhotos(sessionData));
    }, [showPhotoMarkers, getStartEndFromPhotos, buildSessionPhotos]);

    // Update when sessionDetails changes
    useEffect(() => {
        if (sessionDetails && String(sessionDetails.sessionId) === String(sessionId)) {
            processSessionData(sessionDetails);
        }
    }, [sessionDetails, sessionId, processSessionData]);

    // ── Map helpers ────────────────────────────────────────────────────────────
    const clearMap = () => {
        if (!mapInstance.current) return;
        polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
        markers.current.forEach((m) => mapInstance.current.removeLayer(m));
        polylines.current = [];
        markers.current = [];
        markerRefs.current.clear();
    };

    const drawMapWithSession = useCallback((session, showPhotos) => {
        if (!mapInstance.current) return;
        const stats = getSessionStats(session);
        const allLocations = stats.locations || [];
        if (!allLocations.length) return;

        clearMap();
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
            const color = validLocations[i].isOnline === true ? "#102c4a" : "#ef4444";

            const line = L.polyline(
                [p1, p2],
                { color, weight: 3, opacity: 0.8, lineJoin: "round", lineCap: "round" }
            ).addTo(mapInstance.current);
            polylines.current.push(line);
        }

        // Draw start point
        if (startPoint && hasValidCoordinates(startPoint)) {
            const popupContent = `<div style="width:230px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid #e2e8f0;background:linear-gradient(to bottom,#f0fdf4,#ffffff);">
      <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 2px 6px rgba(16,185,129,0.3);flex-shrink:0;">
        ${SVG_ICONS.start}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:12.5px;font-weight:700;color:#0f172a;line-height:1.2;">Start Point</div>
        <div style="font-size:10px;color:#059669;font-weight:500;">Beginning of journey</div>
      </div>
    </div>
    <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="display:flex;align-items:center;color:#64748b;">${SVG_ICONS.clock}</span>
        <span style="font-size:11.5px;color:#334155;font-weight:600;">${fmtTime(startPoint.timestamp)}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="display:flex;align-items:center;color:#64748b;">${SVG_ICONS.calendar}</span>
        <span style="font-size:11.5px;color:#475569;font-weight:500;">${fmtDate(startPoint.timestamp)}</span>
      </div>
      ${startPoint.photo ? `
      <div style="margin-top:4px;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;position:relative;">
        <img src="${startPoint.photo}" style="width:100%;height:135px;object-fit:cover;display:block;" onclick="window.open('${startPoint.photo}','_blank')"/>
      </div>
      <div style="margin-top:2px;display:flex;align-items:center;justify-content:center;gap:4px;color:#64748b;font-size:9.5px;font-weight:500;">
        ${SVG_ICONS.expand}
        <span>Click image to view full size</span>
      </div>
      ` : ''}
    </div>
  </div>`;

            const icon = startPoint.photo ? makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 34) : makeStartIcon("#10b981", fmtTime(startPoint.timestamp), 28);
            const m = L.marker([startPoint.lat, startPoint.lng], {
                icon,
                zIndexOffset: 1000
            }).bindPopup(popupContent, {
                maxWidth: 240,
                minWidth: 230,
                className: 'photo-popup'
            }).addTo(mapInstance.current);

            markers.current.push(m);
            markerRefs.current.set("start", m);
        } else if (validLocations.length > 0) {
            const fb = validLocations[0];
            const popupContent = `<div style="width:200px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
        <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid #e2e8f0;background:#f0fdf4;">
          <div style="width:22px;height:22px;border-radius:6px;background:#10b981;display:flex;align-items:center;justify-content:center;color:#fff;">${SVG_ICONS.start}</div>
          <b style="font-size:11.5px;color:#0f172a;">Start Point</b>
        </div>
        <div style="padding:8px 10px;display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#334155;">${SVG_ICONS.clock} <b>${fmtTime(fb.timestamp)}</b></div>
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#475569;">${SVG_ICONS.calendar} ${fmtDate(fb.timestamp)}</div>
        </div>
      </div>`;
            const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#10b981", fmtTime(fb.timestamp), 28), zIndexOffset: 1000 })
                .bindPopup(popupContent, { maxWidth: 210, minWidth: 200, className: 'photo-popup' }).addTo(mapInstance.current);
            markers.current.push(m);
            markerRefs.current.set("start", m);
        }

        // Draw end point
        if (endPoint && hasValidCoordinates(endPoint)) {
            const popupContent = `<div style="width:230px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid #e2e8f0;background:linear-gradient(to bottom,#fef2f2,#ffffff);">
            <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 2px 6px rgba(239,68,68,0.3);flex-shrink:0;">
                ${SVG_ICONS.end}
            </div>
            <div style="flex:1;min-width:0;">
                <div style="font-size:12.5px;font-weight:700;color:#0f172a;line-height:1.2;">End Point</div>
                <div style="font-size:10px;color:#dc2626;font-weight:500;">Journey completed</div>
            </div>
        </div>
        <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="display:flex;align-items:center;color:#64748b;">${SVG_ICONS.clock}</span>
                <span style="font-size:11.5px;color:#334155;font-weight:600;">${fmtTime(endPoint.timestamp)}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="display:flex;align-items:center;color:#64748b;">${SVG_ICONS.calendar}</span>
                <span style="font-size:11.5px;color:#475569;font-weight:500;">${fmtDate(endPoint.timestamp)}</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:8px;">
                <span style="display:flex;align-items:center;color:#64748b;margin-top:2px;flex-shrink:0;">${SVG_ICONS.pin}</span>
                <span style="font-size:11px;color:#475569;line-height:1.4;word-wrap:break-word;word-break:break-word;">${endPoint.address || "Address not available"}</span>
            </div>
            ${endPoint.photo ? `
            <div style="margin-top:4px;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;position:relative;">
                <img src="${endPoint.photo}" style="width:100%;height:135px;object-fit:cover;display:block;" onclick="window.open('${endPoint.photo}','_blank')"/>
            </div>
            <div style="margin-top:2px;display:flex;align-items:center;justify-content:center;gap:4px;color:#64748b;font-size:9.5px;font-weight:500;">
                ${SVG_ICONS.expand}
                <span>Click image to view full size</span>
            </div>
            ` : ''}
        </div>
    </div>`;

            const icon = endPoint.photo ? makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 34) : makeEndIcon("#ef4444", fmtTime(endPoint.timestamp), 28);
            const m = L.marker([endPoint.lat, endPoint.lng], {
                icon,
                zIndexOffset: 1000
            }).bindPopup(popupContent, {
                maxWidth: 240,
                minWidth: 230,
                className: 'photo-popup'
            }).addTo(mapInstance.current);

            markers.current.push(m);
            markerRefs.current.set("end", m);
        } else if (validLocations.length > 1) {
            const fb = validLocations[validLocations.length - 1];
            const popupContent = `<div style="width:200px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
        <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid #e2e8f0;background:#fef2f2;">
          <div style="width:22px;height:22px;border-radius:6px;background:#ef4444;display:flex;align-items:center;justify-content:center;color:#fff;">${SVG_ICONS.end}</div>
          <b style="font-size:11.5px;color:#0f172a;">End Point</b>
        </div>
        <div style="padding:8px 10px;display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#334155;">${SVG_ICONS.clock} <b>${fmtTime(fb.timestamp)}</b></div>
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#475569;">${SVG_ICONS.calendar} ${fmtDate(fb.timestamp)}</div>
          <div style="display:flex;align-items:flex-start;gap:6px;font-size:11px;color:#475569;">${SVG_ICONS.pin} <span style="line-height:1.3;">${getAddress(fb)}</span></div>
        </div>
      </div>`;
            const m = L.marker([getLat(fb), getLng(fb)], { icon: makeEndIcon("#ef4444", fmtTime(fb.timestamp), 28), zIndexOffset: 1000 })
                .bindPopup(popupContent, { maxWidth: 210, minWidth: 200, className: 'photo-popup' }).addTo(mapInstance.current);
            markers.current.push(m);
            markerRefs.current.set("end", m);
        }

        // Draw route photos
        if (showPhotos && session.photos && session.photos.length > 0) {
            const sortedPhotos = [...session.photos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            sortedPhotos.forEach((photo, idx) => {
                if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
                const lat = getLat(photo.location), lng = getLng(photo.location);
                if (startPoint && hasValidCoordinates(startPoint) && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
                if (endPoint && hasValidCoordinates(endPoint) && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;

                const popup = `<div style="width:230px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid #e2e8f0;background:linear-gradient(to bottom,#fffbeb,#ffffff);">
                <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 2px 6px rgba(245,158,11,0.3);flex-shrink:0;">
                    ${SVG_ICONS.camera}
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-size:12.5px;font-weight:700;color:#0f172a;line-height:1.2;">Route Photo</div>
                    <div style="font-size:10px;color:#d97706;font-weight:500;">Photo ${idx + 1} of ${sortedPhotos.length}</div>
                </div>
            </div>
            <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="display:flex;align-items:center;color:#64748b;">${SVG_ICONS.clock}</span>
                    <span style="font-size:11.5px;color:#334155;font-weight:600;">${fmtTime(photo.timestamp)}</span>
                </div>
                ${photo.remark ? `
                <div style="display:flex;align-items:flex-start;gap:8px;">
                    <span style="display:flex;align-items:center;color:#64748b;margin-top:2px;flex-shrink:0;">${SVG_ICONS.chat}</span>
                    <span style="font-size:11px;color:#475569;line-height:1.4;word-wrap:break-word;word-break:break-word;">${photo.remark}</span>
                </div>
                ` : ''}
                <div style="margin-top:4px;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;position:relative;">
                    <img src="${photo.url}" style="width:100%;height:135px;object-fit:cover;display:block;" onclick="window.open('${photo.url}','_blank')"/>
                </div>
                <div style="margin-top:2px;display:flex;align-items:center;justify-content:center;gap:4px;color:#64748b;font-size:9.5px;font-weight:500;">
                    ${SVG_ICONS.expand}
                    <span>Click image to view full size</span>
                </div>
            </div>
        </div>`;

                const m = L.marker([lat, lng], {
                    icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 28),
                    zIndexOffset: 950
                }).bindPopup(popup, {
                    maxWidth: 240,
                    minWidth: 230,
                    className: 'photo-popup'
                }).addTo(mapInstance.current);

                markers.current.push(m);
                markerRefs.current.set(`photo_${idx}`, m);
            });
        }

        // Fit bounds
        if (validLocations.length > 0 && lastFitBoundsSessionId.current !== String(session.sessionId || session._id)) {
            const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
            mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
            lastFitBoundsSessionId.current = String(session.sessionId || session._id);
        }
    }, [startPoint, endPoint, mapZoom]);

    // Initialize Map
    useEffect(() => {
        if (!mapRef.current || isMapInitialized) return;
        const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 16, minZoom: 3 });

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

        // Listen to zoom changes to adapt arrows size and distance intervals dynamically
        map.on('zoomend', () => {
            setMapZoom(map.getZoom());
        });

        setIsMapInitialized(true);
        if (selectedSession) {
            setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
        }
    }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

    useEffect(() => {
        const tilePane = document.querySelector('.leaflet-tile-pane');
        if (tilePane) {
            tilePane.style.filter = isDarkMode ? "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none";
            tilePane.style.transition = "filter 0.3s ease";
        }
    }, [isDarkMode, isMapInitialized]);

    useEffect(() => {
        if (mapInstance.current && selectedSession) {
            setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
        }
    }, [selectedSession, showPhotoMarkers, startPoint, endPoint, mapZoom, drawMapWithSession]);

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

    // Handle drag and drop reordering
    const handleDragEnd = (fromIndex, toIndex) => {
        const newPhotos = [...sessionPhotos];
        const [draggedItem] = newPhotos.splice(fromIndex, 1);
        newPhotos.splice(toIndex, 0, draggedItem);
        setSessionPhotos(newPhotos);
        setDraggingIndex(null);
    };

    const handlePhotoModalOpen = (photo, index) => {
        setSelectedPhotoIndex(index);
        setPhotoModalOpen(true);
    };

    // ─── Compact Header Component ────────────────────────────────────────────────
    const CompactHeader = () => (
        <Box sx={{ p: 1, display: "flex", alignItems: "center", gap: 0.75 }}>
            <Avatar
                sx={{
                    width: 28,
                    height: 28,
                    bgcolor: alpha("#102c4a", 0.15),
                    color: "#102c4a",
                }}
            >
                {userName?.charAt(0)?.toUpperCase() || <PersonIcon sx={{ fontSize: 16 }} />}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography noWrap sx={{ fontSize: "0.65rem", fontWeight: 600, color: "text.primary" }}>
                    {userName || "User Name"}
                </Typography>
                <Typography noWrap sx={{ fontSize: "0.5rem", color: "text.secondary", display: "flex", alignItems: "center", gap: 0.3 }}>
                    <CalendarIcon sx={{ fontSize: 8 }} />
                    {sessionDate?.toLocaleDateString("en-US", { month: "short", day: "numeric" }) || "No date"}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.3 }}>
                <Chip
                    label={fmtDist(totalDistance)}
                    size="small"
                    sx={{ height: 18, fontSize: "0.5rem", bgcolor: alpha("#102c4a", 0.1), color: "#102c4a" }}
                />
                <Chip
                    label={fmtDuration(totalDuration)}
                    size="small"
                    sx={{ height: 18, fontSize: "0.5rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }}
                />
            </Box>
            <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)} sx={{ color: "#102c4a", p: 0.5 }}>
                {isExpanded ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
            </IconButton>
        </Box>
    );

    // ─── Expanded Details Component ──────────────────────────────────────────────
    const ExpandedDetails = () => (
        <Box sx={{ p: 1, pt: 0, borderTop: `1px solid ${alpha("#102c4a", 0.1)}` }}>
            {selectedSession?.remark && (
                <Chip
                    label={selectedSession.remark}
                    size="small"
                    sx={{
                        bgcolor: alpha("#102c4a", 0.08),
                        color: "#102c4a",
                        fontSize: "0.5rem",
                        height: 20,
                        mb: 0.75,
                        width: "100%",
                        "& .MuiChip-label": { whiteSpace: "normal" }
                    }}
                />
            )}
            <Grid container spacing={0.5}>
                <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                        <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
                        <Box>
                            <Typography sx={{ fontSize: "0.45rem", color: "text.secondary" }}>Start</Typography>
                            <Typography sx={{ fontSize: "0.55rem", fontWeight: 500, color: "#22c55e" }}>{fmtTime(startTime)}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                        <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
                        <Box>
                            <Typography sx={{ fontSize: "0.45rem", color: "text.secondary" }}>End</Typography>
                            <Typography sx={{ fontSize: "0.55rem", fontWeight: 500, color: "#ef4444" }}>{fmtTime(endTime)}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {userEmail && (
                <Typography sx={{ fontSize: "0.5rem", color: "text.secondary", mt: 0.5, display: "flex", alignItems: "center", gap: 0.3 }}>
                    <EmailIcon sx={{ fontSize: 9 }} />
                    {userEmail}
                </Typography>
            )}
        </Box>
    );

    // ─── Photo Carousel Component (Vertical Scroll) ────────────────────────────────
   const PhotoCarousel = () => {
    if (!selectedSession || sessionPhotos.length === 0) return null;

    return (
        <Box sx={{ 
            p: 0.75, 
            pt: 0, 
            borderTop: `1px solid ${alpha("#102c4a", 0.1)}`,
            maxHeight: 220,  // Reduced height for smaller display
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 3 },
            "&::-webkit-scrollbar-track": { bgcolor: alpha("#102c4a", 0.05), borderRadius: 2 },
            "&::-webkit-scrollbar-thumb": { bgcolor: alpha("#102c4a", 0.3), borderRadius: 2 },
        }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mb: 0.5 }}>
                <CollectionsIcon sx={{ fontSize: 10, color: "#FF9800" }} />
                <Typography sx={{ fontSize: "0.5rem", fontWeight: 500, color: "text.secondary" }}>
                    Photos ({sessionPhotos.length})
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",  // 3 images per row
                    gap: 0.5,  // Smaller gap between images
                }}
            >
                {sessionPhotos.map((photo, index) => (
                    <DraggablePhoto
                        key={`${photo.key || photo.url}_${index}`}
                        photo={photo}
                        index={index}
                        onDragEnd={handleDragEnd}
                        onPhotoClick={handlePhotoModalOpen}
                        onFlyToLocation={flyToLocation}
                        onDragStart={(idx) => setDraggingIndex(idx)}
                        isDragging={draggingIndex === index}
                    />
                ))}
            </Box>
        </Box>
    );
};

    // ─── Photo Modal ───────────────────────────────────────────────────────────
    const renderPhotoModal = () => {
        if (!photoModalOpen || selectedPhotoIndex === null) return null;
        const currentPhoto = sessionPhotos[selectedPhotoIndex];
        const isStart = currentPhoto?.type === "start";
        const isEnd = currentPhoto?.type === "end";
        const typeLabel = isStart ? "Start Point" : isEnd ? "End Point" : `Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`;
        const badgeColor = isStart ? "#10b981" : isEnd ? "#ef4444" : "#f59e0b";

        const handleNext = () => setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
        const handlePrev = () => setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
        return (
            <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} closeAfterTransition sx={{ zIndex: 1300 }}>
                <Fade in={photoModalOpen}>
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "92%", sm: "85%", md: 720 },
                        bgcolor: "#0f172a",
                        borderRadius: 3,
                        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                        {/* Header bar */}
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2.5,
                            py: 1.5,
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            bgcolor: "rgba(15,23,42,0.9)",
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    bgcolor: alpha(badgeColor, 0.2),
                                    color: badgeColor,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    {isStart ? <PlayArrowIcon sx={{ fontSize: 14 }} /> : isEnd ? <FlagIcon sx={{ fontSize: 14 }} /> : <CameraAltIcon sx={{ fontSize: 14 }} />}
                                </Box>
                                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc" }}>
                                    {typeLabel}
                                </Typography>
                                <Chip
                                    label={`${selectedPhotoIndex + 1} / ${sessionPhotos.length}`}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: "0.65rem",
                                        fontWeight: 600,
                                        bgcolor: "rgba(255,255,255,0.1)",
                                        color: "#94a3b8"
                                    }}
                                />
                            </Box>
                            <IconButton
                                onClick={() => setPhotoModalOpen(false)}
                                size="small"
                                sx={{ color: "#94a3b8", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
                            >
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>

                        {/* Image viewer */}
                        <Box sx={{ position: "relative", bgcolor: "#020617", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, maxHeight: "65vh" }}>
                            <img
                                src={currentPhoto?.url}
                                alt="Full size"
                                style={{ width: "100%", maxHeight: "65vh", objectFit: "contain", display: "block" }}
                            />
                            {sessionPhotos.length > 1 && (
                                <>
                                    <IconButton
                                        onClick={handlePrev}
                                        sx={{
                                            position: "absolute",
                                            left: 12,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            bgcolor: "rgba(15,23,42,0.7)",
                                            color: "white",
                                            backdropFilter: "blur(4px)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            "&:hover": { bgcolor: "rgba(15,23,42,0.9)" }
                                        }}
                                    >
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNext}
                                        sx={{
                                            position: "absolute",
                                            right: 12,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            bgcolor: "rgba(15,23,42,0.7)",
                                            color: "white",
                                            backdropFilter: "blur(4px)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            "&:hover": { bgcolor: "rgba(15,23,42,0.9)" }
                                        }}
                                    >
                                        <NavigateNextIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>

                        {/* Footer info */}
                        <Box sx={{
                            p: 2,
                            bgcolor: "#0f172a",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                            justifyContent: "space-between",
                            gap: 1.5,
                        }}>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <CalendarIcon sx={{ fontSize: 13, color: "#64748b" }} />
                                    {fmtDateTime(currentPhoto?.timestamp)}
                                </Typography>
                                {currentPhoto?.address && (
                                    <Typography noWrap sx={{ fontSize: "0.72rem", color: "#cbd5e1", mt: 0.5, display: "flex", alignItems: "center", gap: 0.75 }}>
                                        <LocationOnIcon sx={{ fontSize: 13, color: "#ef4444", flexShrink: 0 }} />
                                        {currentPhoto.address}
                                    </Typography>
                                )}
                                {currentPhoto?.remark && (
                                    <Typography sx={{ fontSize: "0.72rem", color: "#cbd5e1", mt: 0.5 }}>
                                        Note: {currentPhoto.remark}
                                    </Typography>
                                )}
                            </Box>
                            {currentPhoto?.lat && currentPhoto?.lng && currentPhoto.lat !== 0 && currentPhoto.lng !== 0 && (
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => {
                                        flyToLocation(currentPhoto.lat, currentPhoto.lng, currentPhoto);
                                        setPhotoModalOpen(false);
                                    }}
                                    startIcon={<LocationOnIcon sx={{ fontSize: 14 }} />}
                                    sx={{
                                        fontSize: "0.72rem",
                                        bgcolor: "#102c4a",
                                        color: "#fff",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: 1.5,
                                        whiteSpace: "nowrap",
                                        "&:hover": { bgcolor: "#1b3a5c" }
                                    }}
                                >
                                    Focus on Map
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        );
    };

    // Loading state
    if (loading || sessionDetailsLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress sx={{ color: "#102c4a" }} />
            </Box>
        );
    }

    if (!selectedSession) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", gap: 2 }}>
                <InfoIcon sx={{ fontSize: 64, color: alpha("#102c4a", 0.3) }} />
                <Typography variant="h6" color="text.secondary">No session data available</Typography>
                <Button variant="contained" onClick={() => window.history.back()} sx={{ bgcolor: "#102c4a" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", bgcolor: "background.paper" }}>
            {/* AppBar */}
            <AppBar position="static" sx={{ flexShrink: 0, bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
                <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
                    <IconButton onClick={() => window.history.back()} sx={{ color: "#102c4a" }}>
                        <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                    </IconButton>
                    <Box sx={{ flex: 1, ml: 1 }}>
                        <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#102c4a", fontWeight: 600 }}>
                            Location Details
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setIsDarkMode(!isDarkMode)} sx={{ color: "#102c4a", mr: 1, bgcolor: alpha("#102c4a", 0.1) }}>
                        {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Map Container */}
            <Box sx={{ flex: 1, position: "relative", minHeight: 0 }}>
                <div ref={mapRef} style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }} />

                {sessionDetailsLoading && (
                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
                        <CircularProgress size={40} sx={{ color: "#102c4a" }} />
                    </Box>
                )}

                {/* Small Info Card - Right Side */}
                {selectedSession && (
                    <Paper sx={{
                        position: "absolute",
                        top: 70,
                        right: 12,
                        width: 220,
                        maxHeight: 'calc(100vh - 100px)',
                        zIndex: 500,
                        borderRadius: 1.5,
                        overflow: "auto",
                        bgcolor: "rgba(255, 255, 255, 0.96)",
                        backdropFilter: "blur(16px)",
                        border: `1px solid ${alpha("#102c4a", 0.15)}`,
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                        "&::-webkit-scrollbar": { width: 3 },
                        "&::-webkit-scrollbar-track": { bgcolor: alpha("#102c4a", 0.05) },
                        "&::-webkit-scrollbar-thumb": { bgcolor: alpha("#102c4a", 0.3), borderRadius: 2 },
                    }}>
                        <CompactHeader />
                        {isExpanded && <ExpandedDetails />}
                        <PhotoCarousel />
                    </Paper>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: alpha('#102c4a', 0.15) }}>
                                <PinDropIcon sx={{ fontSize: 14, color: "#102c4a" }} />
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
                            <Box sx={{ width: 18, height: 4, bgcolor: '#102c4a', borderRadius: 2, boxShadow: "0 1px 3px rgba(16, 44, 74, 0.4)" }} />
                            <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Online Route</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 18, height: 4, bgcolor: '#ef4444', borderRadius: 2, boxShadow: "0 1px 3px rgba(239, 68, 68, 0.4)" }} />
                            <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Offline Route</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 18, height: 18, bgcolor: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                <PlayArrowIcon sx={{ fontSize: 11 }} />
                            </Box>
                            <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Start Point</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 18, height: 18, bgcolor: '#f59e0b', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                <CameraAltIcon sx={{ fontSize: 10 }} />
                            </Box>
                            <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>Route Photo</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 18, height: 18, bgcolor: '#ef4444', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                <FlagIcon sx={{ fontSize: 10 }} />
                            </Box>
                            <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: isDarkMode ? "#ccc" : "text.secondary" }}>End Point</Typography>
                        </Box>
                      </Box>
                    )}
                </Paper>
            </Box>

            {renderPhotoModal()}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ReportLocation;