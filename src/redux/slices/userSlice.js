import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// Create axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle User Registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Handle User Update
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/updateuser/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Handle Specialized Permission Update (JSON)
export const updateUserPermissions = createAsyncThunk(
  "user/updateUserPermissions",
  async ({ userId, permissions, role_id }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/updateuser/${userId}`,
        { permissions, role_id },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch All Users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/alluser/${adminId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch Single User by ID
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/deleteuser/${userId}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUserCounts = createAsyncThunk(
  "user/getUserCounts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });

      const queryString = new URLSearchParams(cleanParams).toString();
      const url = `/users/user-counts${queryString ? `?${queryString}` : ""}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "user/getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/alladmins");
      return response.data?.admins;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUserTrack = createAsyncThunk(
  "user/trackRecord",
  async ({ id, date = "" }, { rejectWithValue }) => {
    try {
      const url = date
        ? `/tracks/usertrack/${id}?date=${date}`
        : `/tracks/usertrack/${id}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all tracked dates for a user
export const getUserTrackedDates = createAsyncThunk(
  "user/getUserTrackedDates",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tracks/user/${userId}/tracked-dates`);
      return response.data.trackedDates;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getActiveUserLocations = createAsyncThunk(
  "user/getActiveUserLocations",
  async (adminId, { rejectWithValue }) => {
    try {
      const url = "/tracks/admin/active-user-locations";
      const response = await api.get(url);
      return response.data.users;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch locations");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLastFiveTrackedUsers = createAsyncThunk(
  "user/getLastFiveTrackedUsers",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tracks/last-five-tracked-users/${adminId}`);
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ✅ KEEP THIS ONE - for logged-in users changing password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/reset-password", {
        oldPassword,
        newPassword,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ============ CONFIGURATION APIS ============

// Get Configuration
export const getConfig = createAsyncThunk(
  "user/getConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/getconfig");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch configuration");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create or Update Configuration
export const createOrUpdateConfig = createAsyncThunk(
  "user/createOrUpdateConfig",
  async (configData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/createorupdate", configData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to save configuration";
      if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
        toast.error("Permission denied. Only Super Admin can manage configuration.");
      } else {
        toast.error(errorMessage);
      }
      return rejectWithValue(error.response?.data || { message: errorMessage });
    }
  }
);

// Delete Configuration
export const deleteConfig = createAsyncThunk(
  "user/deleteConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/users/delete");
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to delete configuration";
      if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
        toast.error("Permission denied. Only Super Admin can delete configuration.");
      } else {
        toast.error(errorMessage);
      }
      return rejectWithValue(error.response?.data || { message: errorMessage });
    }
  }
);

// ============ SUBSCRIPTION CHECK API ============

export const checkUserSubscription = createAsyncThunk(
  "user/checkSubscription",
  async (adminId = null, { rejectWithValue, getState }) => {
    try {
      const url = adminId ? `users/user/check-subscription?adminId=${adminId}` : "users/user/check-subscription";
      const response = await api.get(url);
      
      const state = getState();
      const userRole = state.auth?.user?.role_id || 
        state.user?.userInfo?.role_id || 
        JSON.parse(localStorage.getItem("user") || "{}")?.role_id;

      if (userRole === 2) {
        return {
          hasSubscription: true,
          expired: false,
          message: "Super Admin account - no subscription restrictions",
          planName: "Super Admin",
          amount: 0,
          remainingDays: 999,
          expiresAt: null,
          username: response.data?.data?.username || "Super Admin"
        };
      }

      return response.data.data;
    } catch (error) {
      console.error("Subscription check error:", error.response?.data);
      toast.error(error?.response?.data?.message || "Failed to check subscription");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAdminStats = createAsyncThunk(
  'user/getAdminStats',
  async ({ adminId }, { rejectWithValue }) => {
    try {
      // Use api instance for consistency
      const response = await api.get(`/Tracking/admin/${adminId}/users/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch admin stats'
      );
    }
  }
);

// ============ ADMIN USER MANAGEMENT APIS ============

export const getUsersUnderAdmin = createAsyncThunk(
  "user/getUsersUnderAdmin",
  async ({ adminId, page = 1, limit = 20, search = '' }, { rejectWithValue }) => {
    try {
      if (!adminId) throw new Error('Admin ID is required');
      const response = await api.get(`/Tracking/admin/${adminId}/users`, {
        params: { page, limit, search }
      });
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Failed to fetch users");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserAvailableDates = createAsyncThunk(
  "user/getUserAvailableDates",
  async ({ id, date }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/Tracking/admin/users/${id}/sessions/dates`, {
        params: { date }
      });
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch available dates");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserSessionsByDate = createAsyncThunk(
  "user/getUserSessionsByDate",
  async ({ userId, date, cursor = null, limit = 10 }, { rejectWithValue }) => {
    try {
      const params = { date, limit };
      if (cursor) params.cursor = cursor;
      const response = await api.get(`/Tracking/admin/users/${userId}/sessions`, { params });
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch sessions");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSessionDetails = createAsyncThunk(
  "user/getSessionDetails",
  async ({ userId, sessionId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/Tracking/admin/users/${userId}/sessions/${sessionId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch session details");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserSummary = createAsyncThunk(
  "user/getUserSummary",
  async ({ adminId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/Tracking/admin/${adminId}/users/${userId}/summary`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch user summary");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: JSON.parse(localStorage.getItem("user")) || {},
    usersList: [],
    totalUsers: null,
    adminList: [],
    userCounts: {},
    userTrackInfo: [],
    error: null,
    trackedDates: [],
    trackedDatesLoading: false,
    trackedDatesError: null,
    activeUserLocations: [],
    activeUserLocationsLoading: false,
    activeUserLocationsError: null,
    lastTrackedUsers: [],
    lastTrackedUsersLoading: false,
    lastTrackedUsersError: null,
    
    // Config states
    config: null,
    configLoading: false,
    configError: null,
    configUpdateLoading: false,
    configUpdateError: null,
    configDeleteLoading: false,
    configDeleteError: null,
    
    // Admin User Management States
    adminUsersList: [],
    adminUsersPagination: {
      currentPage: 1,
      totalPages: 1,
      totalUsers: 0,
      hasMore: false
    },
    adminUsersLoading: false,
    adminUsersError: null,

    userAvailableDates: [],
    userAvailableDatesLoading: false,
    userAvailableDatesError: null,
    currentMonthSummary: null,
    totalAvailableDays: 0,

    userSessionsList: [],
    userSessionsSummary: null,
    userSessionsPagination: {
      nextCursor: null,
      hasMore: false,
      totalForDay: 0
    },
    userSessionsLoading: false,
    userSessionsError: null,
    selectedDate: null,

    sessionDetails: null,
    sessionDetailsLoading: false,
    sessionDetailsError: null,
    sessionLocations: [],
    sessionPhotos: [],
    sessionBounds: null,
    sessionStats: null,
    sessionTimeline: [],

    // User Summary States
    userSummary: null,
    userSummaryStats: null,
    userRecentSessions: [],
    userSummaryLoading: false,
    userSummaryError: null,
    isUserActiveToday: false,

    // Subscription State
    subscription: {
      data: null,
      loading: false,
      error: null,
      hasSubscription: false,
      expired: true,
      remainingDays: 0,
      planName: null,
      amount: 0,
      expiresAt: null,
    },

    // Admin Stats State
    adminStats: null,
    adminStatsLoading: false,
    adminStatsError: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = {};
      state.usersList = [];
      state.adminList = [];
      state.userTrackInfo = [];
      state.userCounts = {};
      state.error = null;
      state.loading = false;
      state.config = null;
      state.adminStats = null;
      state.subscription.data = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList.push(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // User Update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.user;
        const userIndex = state.usersList.findIndex(u => u._id === updatedUser._id);
        if (userIndex !== -1) state.usersList[userIndex] = updatedUser;
        if (state.userInfo?._id === updatedUser._id) {
          state.userInfo = updatedUser;
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload.users;
        state.totalUsers = action.payload.userCount;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.adminList = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.userCounts = action.payload.count;
      })
      .addCase(getUserCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = state.usersList.filter(u => u._id !== action.payload.user._id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTrack.fulfilled, (state, action) => {
        state.loading = false;
        state.userTrackInfo = action.payload?.user;
      })
      .addCase(getUserTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserTrackedDates.pending, (state) => {
        state.trackedDatesLoading = true;
        state.trackedDatesError = null;
      })
      .addCase(getUserTrackedDates.fulfilled, (state, action) => {
        state.trackedDatesLoading = false;
        state.trackedDates = action.payload;
      })
      .addCase(getUserTrackedDates.rejected, (state, action) => {
        state.trackedDatesLoading = false;
        state.trackedDatesError = action.payload;
      })

      .addCase(getActiveUserLocations.pending, (state) => {
        state.activeUserLocationsLoading = true;
        state.activeUserLocationsError = null;
      })
      .addCase(getActiveUserLocations.fulfilled, (state, action) => {
        state.activeUserLocationsLoading = false;
        state.activeUserLocations = action.payload;
      })
      .addCase(getActiveUserLocations.rejected, (state, action) => {
        state.activeUserLocationsLoading = false;
        state.activeUserLocationsError = action.payload;
      })

      .addCase(getLastFiveTrackedUsers.pending, (state) => {
        state.lastTrackedUsersLoading = true;
        state.lastTrackedUsersError = null;
      })
      .addCase(getLastFiveTrackedUsers.fulfilled, (state, action) => {
        state.lastTrackedUsersLoading = false;
        state.lastTrackedUsers = action.payload;
      })
      .addCase(getLastFiveTrackedUsers.rejected, (state, action) => {
        state.lastTrackedUsersLoading = false;
        state.lastTrackedUsersError = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Configuration
      .addCase(getConfig.pending, (state) => {
        state.configLoading = true;
        state.configError = null;
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        state.configLoading = false;
        state.config = action.payload.data;
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = action.payload?.message || "Failed to fetch configuration";
      })

      .addCase(createOrUpdateConfig.pending, (state) => {
        state.configUpdateLoading = true;
        state.configUpdateError = null;
      })
      .addCase(createOrUpdateConfig.fulfilled, (state, action) => {
        state.configUpdateLoading = false;
        state.config = action.payload.data;
      })
      .addCase(createOrUpdateConfig.rejected, (state, action) => {
        state.configUpdateLoading = false;
        state.configUpdateError = action.payload?.message || "Failed to save configuration";
      })

      .addCase(deleteConfig.pending, (state) => {
        state.configDeleteLoading = true;
        state.configDeleteError = null;
      })
      .addCase(deleteConfig.fulfilled, (state) => {
        state.configDeleteLoading = false;
        state.config = null;
      })
      .addCase(deleteConfig.rejected, (state, action) => {
        state.configDeleteLoading = false;
        state.configDeleteError = action.payload?.message || "Failed to delete configuration";
      })

      // Subscription
      .addCase(checkUserSubscription.pending, (state) => {
        state.subscription.loading = true;
        state.subscription.error = null;
      })
      .addCase(checkUserSubscription.fulfilled, (state, action) => {
        state.subscription.loading = false;
        state.subscription.data = action.payload;
        state.subscription.hasSubscription = action.payload.hasSubscription;
        state.subscription.expired = action.payload.expired;
        state.subscription.remainingDays = action.payload.remainingDays;
        state.subscription.planName = action.payload.planName;
        state.subscription.amount = action.payload.amount;
        state.subscription.expiresAt = action.payload.expiresAt;
      })
      .addCase(checkUserSubscription.rejected, (state, action) => {
        state.subscription.loading = false;
        state.subscription.error = action.payload?.message || "Failed to check subscription";
      })

      // Admin Stats
      .addCase(getAdminStats.pending, (state) => {
        state.adminStatsLoading = true;
        state.adminStatsError = null;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.adminStatsLoading = false;
        state.adminStats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.adminStatsLoading = false;
        state.adminStatsError = action.payload;
      })

      // Admin User Management
      .addCase(getUsersUnderAdmin.pending, (state) => {
        state.adminUsersLoading = true;
        state.adminUsersError = null;
      })
      .addCase(getUsersUnderAdmin.fulfilled, (state, action) => {
        state.adminUsersLoading = false;
        state.adminUsersList = action.payload.users;
        state.adminUsersPagination = action.payload.pagination;
      })
      .addCase(getUsersUnderAdmin.rejected, (state, action) => {
        state.adminUsersLoading = false;
        state.adminUsersError = action.payload?.message || "Failed to fetch users";
      })

      .addCase(getUserAvailableDates.pending, (state) => {
        state.userAvailableDatesLoading = true;
        state.userAvailableDatesError = null;
      })
      .addCase(getUserAvailableDates.fulfilled, (state, action) => {
        state.userAvailableDatesLoading = false;
        state.userTrackInfo = action.payload.sessions || [];
        state.userAvailableDates = action.payload.dates || [];
        state.currentMonthSummary = action.payload.currentMonth;
        state.totalAvailableDays = action.payload.totalAvailableDays;
      })
      .addCase(getUserAvailableDates.rejected, (state, action) => {
        state.userAvailableDatesLoading = false;
        state.userAvailableDatesError = action.payload?.message || "Failed to fetch dates";
      })

      .addCase(getUserSessionsByDate.pending, (state) => {
        state.userSessionsLoading = true;
        state.userSessionsError = null;
      })
      .addCase(getUserSessionsByDate.fulfilled, (state, action) => {
        state.userSessionsLoading = false;
        state.userSessionsList = action.payload?.sessions || [];
        state.userSessionsSummary = action.payload?.summary || null;
        state.userSessionsPagination = action.payload?.pagination || { nextCursor: null, hasMore: false, totalForDay: 0 };
        state.selectedDate = action.payload?.date || null;
      })
      .addCase(getUserSessionsByDate.rejected, (state, action) => {
        state.userSessionsLoading = false;
        state.userSessionsError = action.payload?.message || "Failed to fetch sessions";
      })

      .addCase(getSessionDetails.pending, (state) => {
        state.sessionDetailsLoading = true;
        state.sessionDetailsError = null;
      })
      .addCase(getSessionDetails.fulfilled, (state, action) => {
        state.sessionDetailsLoading = false;
        state.sessionDetails = action.payload;
        state.sessionLocations = action.payload.locations || [];
        state.sessionPhotos = action.payload.photos || [];
        state.sessionBounds = action.payload.bounds || null;
        state.sessionStats = action.payload.stats || null;
        state.sessionTimeline = action.payload.timeline || [];
      })
      .addCase(getSessionDetails.rejected, (state, action) => {
        state.sessionDetailsLoading = false;
        state.sessionDetailsError = action.payload?.message || "Failed to fetch session details";
      })

      .addCase(getUserSummary.pending, (state) => {
        state.userSummaryLoading = true;
        state.userSummaryError = null;
      })
      .addCase(getUserSummary.fulfilled, (state, action) => {
        state.userSummaryLoading = false;
        state.userSummary = action.payload.user;
        state.userSummaryStats = action.payload.stats;
        state.userRecentSessions = action.payload.recentSessions;
        state.isUserActiveToday = action.payload.stats?.isActiveToday || false;
      })
      .addCase(getUserSummary.rejected, (state, action) => {
        state.userSummaryLoading = false;
        state.userSummaryError = action.payload?.message || "Failed to fetch user summary";
      })

      .addCase("auth/logout", (state) => {
        state.userInfo = {};
        state.usersList = [];
        state.adminUsersList = [];
        state.userSummary = null;
        state.activeUserLocations = [];
        localStorage.removeItem("user");
      });
  },
});

export const { logoutUser, setUserInfo } = userSlice.actions;
export default userSlice.reducer;