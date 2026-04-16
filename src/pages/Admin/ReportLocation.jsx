import React, { useEffect, useState, useCallback, useRef } from "react";
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
    useTheme,
    useMediaQuery,
    CircularProgress,
    Divider,
    Modal,
    Fade,
    Button,
    Avatar,
    Stack,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
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
} from "@mui/icons-material";
import { getSessionDetails } from "../../redux/slices/userSlice";
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

const makeStartIcon = (color, time, size = 28) =>
    L.divIcon({
        html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
        <span style="font-size:${size / 2.8}px;line-height:1">🚀</span>
        <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">START</span>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
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
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
        <span style="font-size:${size / 2.8}px;line-height:1">🏁</span>
        <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">END</span>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
        ${time}
      </div>
    </div>`,
        className: "",
        iconSize: [size, size + 20],
        iconAnchor: [size / 2, size + 10],
    });

const isSameLatLng = (lat1, lng1, lat2, lng2) =>
    Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

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

    // ── Refs ───────────────────────────────────────────────────────────────────
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const polylines = useRef([]);
    const markers = useRef([]);
    const markerRefs = useRef(new Map());

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

        // Draw polyline
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

        // Draw start point
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

        // Draw end point
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

        // Draw route photos
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

        // Fit bounds
        if (validLocations.length > 0) {
            const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
            mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
        }
    }, [startPoint, endPoint]);

    // Initialize Map
    useEffect(() => {
        if (!mapRef.current || isMapInitialized) return;
        const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap",
            maxZoom: 19,
        }).addTo(map);
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

    // Loading state
    if (loading || sessionDetailsLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress sx={{ color: "#2196F3" }} />
            </Box>
        );
    }

    if (!selectedSession) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", gap: 2 }}>
                <InfoIcon sx={{ fontSize: 64, color: alpha("#2196F3", 0.3) }} />
                <Typography variant="h6" color="text.secondary">No session data available</Typography>
                <Button variant="contained" onClick={() => window.history.back()} sx={{ bgcolor: "#2196F3" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

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
                            Location Details
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ py: 0, px: 0, height: "calc(100vh - 48px)", overflow: "hidden" }}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={12} sx={{ height: "100%", position: "relative" }}>
                        <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "100%", backgroundColor: "#f0f0f0" }} />

                        {sessionDetailsLoading && (
                            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
                                <CircularProgress size={40} sx={{ color: "#2196F3" }} />
                            </Box>
                        )}

                        {/* User Info Card */}
                        {selectedSession && (
                            <Paper sx={{
                                position: "absolute",
                                top: 12,
                                left: 50,
                                right: isMobile ? 12 : 'auto',
                                maxWidth: { xs: 'calc(100% - 24px)', sm: 320 },
                                zIndex: 500,
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                borderRadius: 2,
                                overflow: "hidden",
                                bgcolor: "rgba(255, 255, 255, 0.08)",
                                backdropFilter: "blur(12px)",
                                border: `1px solid rgba(255, 255, 255, 0.2)`,
                            }}>
                                {/* User Header */}
                                <Box sx={{
                                    p: 1.5,
                                    bgcolor: alpha("#2196F3", 0.08),
                                    borderBottom: `1px solid ${alpha("#2196F3", 0.1)}`,
                                }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                bgcolor: alpha("#2196F3", 0.15),
                                                color: "#2196F3",
                                            }}
                                        >
                                            {userName?.charAt(0)?.toUpperCase() || <PersonIcon />}
                                        </Avatar>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ fontSize: "0.8rem", color: "text.primary" }}>
                                                {userName || "User Name"}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: "0.65rem", display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <EmailIcon sx={{ fontSize: 10 }} />
                                                {userEmail || "user@example.com"}
                                            </Typography>
                                            {sessionDate && (
                                                <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                                                    <CalendarIcon sx={{ fontSize: 9 }} />
                                                    {sessionDate.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Stack>
                                </Box>

                                {/* Session Stats */}
                                {hasLocations && (
                                    <Box sx={{ p: 1.5 }}>
                                        {/* Remark */}
                                        {selectedSession.remark && (
                                            <Box sx={{ mb: 1 }}>
                                                <Chip
                                                    label={selectedSession.remark}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: alpha("#2196F3", 0.08),
                                                        color: "#2196F3",
                                                        fontSize: "0.6rem",
                                                        height: 22,
                                                        maxWidth: "100%",
                                                        "& .MuiChip-label": { whiteSpace: "normal" }
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        {/* Stats Row */}
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Box sx={{
                                                    bgcolor: alpha("#FF9800", 0.08),
                                                    p: 0.75,
                                                    borderRadius: 1.5,
                                                    textAlign: "center"
                                                }}>
                                                    <TimerIcon sx={{ fontSize: 14, color: "#FF9800", mb: 0.25 }} />
                                                    <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary", display: "block" }}>
                                                        Duration
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem", color: "#FF9800" }}>
                                                        {fmtDuration(totalDuration)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{
                                                    bgcolor: alpha("#2196F3", 0.08),
                                                    p: 0.75,
                                                    borderRadius: 1.5,
                                                    textAlign: "center"
                                                }}>
                                                    <StraightenIcon sx={{ fontSize: 14, color: "#2196F3", mb: 0.25 }} />
                                                    <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary", display: "block" }}>
                                                        Distance
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.7rem", color: "#2196F3" }}>
                                                        {fmtDist(totalDistance)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Divider sx={{ my: 1 }} />

                                        {/* Start/End Times */}
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                    <StartIcon sx={{ fontSize: 12, color: "#22c55e" }} />
                                                    <Box>
                                                        <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary", display: "block" }}>
                                                            Start
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.65rem", color: "#22c55e" }}>
                                                            {fmtTime(startTime)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                    <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
                                                    <Box>
                                                        <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary", display: "block" }}>
                                                            End
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.65rem", color: "#ef4444" }}>
                                                            {fmtTime(endTime)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                            </Paper>
                        )}

                        {renderPhotoCarousel()}
                    </Grid>
                </Grid>
            </Container>

            {renderPhotoModal()}
        </Box>
    );
};

export default ReportLocation;