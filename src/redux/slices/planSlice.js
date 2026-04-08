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

// Async Thunks
export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/plans/create", payload);
      toast.success(response.data?.message || "Plan created successfully!");
      return response.data;
    } catch (error) {
      console.error("Error creating plan:", error);
      const errorMessage = error.response?.data?.message || "Failed to create plan";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

export const getAllPlans = createAsyncThunk(
  "plan/getAllPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/plans/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch plans";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

export const getPlanById = createAsyncThunk(
  "plan/getPlanById",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching plan:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch plan";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plan/updatePlan",
  async ({ planId, updatedPlan }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/plans/update/${planId}`,
        updatedPlan
      );
      toast.success(response.data?.message || "Plan updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating plan:", error);
      const errorMessage = error.response?.data?.message || "Failed to update plan";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plan/deletePlan",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/plans/delete/${planId}`
      );
      toast.success(response.data?.message || "Plan deleted successfully!");
      return response.data;
    } catch (error) {
      console.error("Error deleting plan:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete plan";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

export const getUsersWithExpiringPlans = createAsyncThunk(
  "plan/getUsersWithExpiringPlans",
  async (params = { daysBeforeExpiry: 7 }, { rejectWithValue }) => {
    try {
      // Clean params - remove empty values
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });

      // Default days if not provided
      if (!cleanParams.daysBeforeExpiry) cleanParams.daysBeforeExpiry = 7;

      const queryString = new URLSearchParams(cleanParams).toString();
      const url = `/plans/expiring-users${queryString ? `?${queryString}` : ""}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching users with expiring plans:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch expiring users";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// Async thunk for canceling subscription
// Async thunk for canceling subscription - FIXED VERSION
export const cancelSubscription = createAsyncThunk(
  'plan/cancelSubscription',
  async ({ cancellationReason }, { rejectWithValue }) => {
    try {
      // Use your configured api instance instead of axios directly
      const response = await api.post('/plans/subscription/cancel', { cancellationReason });
      toast.success(response.data?.message || "Subscription cancelled successfully!");
      return response.data;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      const errorMessage = error.response?.data?.message || 'Failed to cancel subscription';
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// Async thunk for getting cancellation status
export const getCancellationStatus = createAsyncThunk(
  'plan/getCancellationStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/plans/subscription/cancellation-status');
      return response.data;
    } catch (error) {
      console.error("Error fetching cancellation status:", error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch cancellation status';
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// NEW: Create Custom Plan (for authenticated users)
export const createCustomPlan = createAsyncThunk(
  "plan/createCustomPlan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/plans/custom", payload);
      toast.success(response.data?.message || "Custom plan created successfully!");
      return response.data;
    } catch (error) {
      console.error("Error creating custom plan:", error);
      const errorMessage = error.response?.data?.message || "Failed to create custom plan";

      // Special handling for duplicate plan error
      if (error.response?.data?.existingPlanId) {
        toast.error("You already have a custom plan. Only one custom plan per user is allowed.");
      } else {
        toast.error(errorMessage);
      }

      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// NEW: Get User's Custom Plan
export const getUserCustomPlan = createAsyncThunk(
  "plan/getUserCustomPlan",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/plans/custom/my-plan");
      return response.data;
      // console.log(response.data);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch custom plan";

      // Don't log or show error toast for 404 (no custom plan found)
      if (error.response?.status !== 404) {
        console.error("Error fetching user custom plan:", error);
        toast.error(errorMessage);
      }

      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// NEW: Update Custom Plan
export const updateCustomPlan = createAsyncThunk(
  "plan/updateCustomPlan",
  async ({ planId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/plans/custom/${planId}`, data);
      toast.success(response.data?.message || "Custom plan updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating custom plan:", error);
      const errorMessage = error.response?.data?.message || "Failed to update custom plan";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// NEW: Get Available Plans for Pricing (excludes Add on and Customize plans)
export const getAvailablePlans = createAsyncThunk(
  "plan/getAvailablePlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/plans/pricingplans");
      return response.data;
    } catch (error) {
      console.error("Error fetching available plans:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch available plans";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// NEW: Get Popular Plans for Dashboard
export const getPopularPlans = createAsyncThunk(
  "plan/getPopularPlans",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Clean params - remove empty values
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });

      const queryString = new URLSearchParams(cleanParams).toString();
      const url = `/plans/popular-plan${queryString ? `?${queryString}` : ""}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching popular plans:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch popular plans";
      // Optional: Don't show toast for dashboard charts, handle quietly
      return rejectWithValue(error.response?.data || errorMessage);
    }
  }
);

// Slice
const planSlice = createSlice({
  name: "plan",
  initialState: {
    loading: false,
    plansList: [],
    expiringUsers: [],
    selectedPlan: null,
    error: null,
    userCustomPlan: null,
    availablePlans: [],

    // Cancellation state
    isCancelling: false,
    cancelError: null,
    cancelSuccess: false,
    cancelData: null,

    // Cancellation status
    cancellationStatus: null,
    cancellationStatusLoading: false,
    isSubscriptionCancelled: false,
    hasActiveSubscription: false,
    currentPlan: null,
    previousPlan: null,
    subscriptionCancelledAt: null,
  },
  reducers: {
    clearPlanStore: (state) => {
      state.plansList = [];
      state.expiringUsers = [];
      state.selectedPlan = null;
      state.error = null;
      state.loading = false;
      state.userCustomPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all plans
      .addCase(getAllPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plansList = action.payload?.data || action.payload || [];
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get plan by ID
      .addCase(getPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlan = action.payload?.data || action.payload;
      })
      .addCase(getPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create plan
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plansList.push(action.payload?.plan || action.payload);
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update plan
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlan = action.payload?.plan || action.payload;
        if (updatedPlan?._id) {
          const index = state.plansList.findIndex(
            (plan) => plan._id === updatedPlan._id
          );
          if (index !== -1) {
            state.plansList[index] = updatedPlan;
          }
        }
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete plan
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        const deletedPlanId = action.payload?.planId || action.payload?.data?._id;
        if (deletedPlanId) {
          state.plansList = state.plansList.filter(
            (plan) => plan._id !== deletedPlanId
          );
        }
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get users with expiring plans
      .addCase(getUsersWithExpiringPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersWithExpiringPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.expiringUsers = action.payload?.data || action.payload || [];
      })
      .addCase(getUsersWithExpiringPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // NEW: Create custom plan
      .addCase(createCustomPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.userCustomPlan = action.payload?.plan || action.payload;
        // Also add to plansList if needed
        if (action.payload?.plan) {
          state.plansList.push(action.payload.plan);
        }
      })
      .addCase(createCustomPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // NEW: Get user custom plan
      .addCase(getUserCustomPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCustomPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.userCustomPlan = action.payload?.plan || action.payload;
      })
      .addCase(getUserCustomPlan.rejected, (state, action) => {
        state.loading = false;
        // Don't set error for 404 (no custom plan found)
        if (action.payload?.statusCode !== 404) {
          state.error = action.payload;
        }
      })

      // NEW: Update custom plan
      .addCase(updateCustomPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomPlan.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlan = action.payload?.plan || action.payload;

        // Update userCustomPlan
        if (updatedPlan?._id) {
          state.userCustomPlan = updatedPlan;

          // Also update in plansList if present
          const index = state.plansList.findIndex(
            (plan) => plan._id === updatedPlan._id
          );
          if (index !== -1) {
            state.plansList[index] = updatedPlan;
          }
        }
      })
      .addCase(updateCustomPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // NEW: Get available plans
      .addCase(getAvailablePlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailablePlans.fulfilled, (state, action) => {
        state.loading = false;
        state.availablePlans = action.payload?.data || action.payload || [];
      })
      .addCase(getAvailablePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel Subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.isCancelling = true;
        state.cancelError = null;
        state.cancelSuccess = false;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.isCancelling = false;
        state.cancelSuccess = true;
        state.cancelData = action.payload.data;
        state.isSubscriptionCancelled = true;
        state.hasActiveSubscription = false;
        state.previousPlan = state.currentPlan;
        state.currentPlan = null;
        state.subscriptionCancelledAt = action.payload.data.subscriptionCancelledAt;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.isCancelling = false;
        state.cancelError = action.payload;
        state.cancelSuccess = false;
      })
      // Get Cancellation Status
      .addCase(getCancellationStatus.pending, (state) => {
        state.cancellationStatusLoading = true;
        state.cancellationStatusError = null;
      })
      .addCase(getCancellationStatus.fulfilled, (state, action) => {
        state.cancellationStatusLoading = false;
        state.cancellationStatus = action.payload.data;
        state.isSubscriptionCancelled = action.payload.data.isSubscriptionCancelled;
        state.hasActiveSubscription = !action.payload.data.isSubscriptionCancelled && action.payload.data.currentPlan !== null;
        state.currentPlan = action.payload.data.currentPlan;
        state.previousPlan = action.payload.data.previousPlan;
        state.subscriptionCancelledAt = action.payload.data.subscriptionCancelledAt;
      })
      .addCase(getCancellationStatus.rejected, (state, action) => {
        state.cancellationStatusLoading = false;
        state.cancellationStatusError = action.payload;
      });;
  },
});

export const { clearPlanStore } = planSlice.actions;

export default planSlice.reducer;