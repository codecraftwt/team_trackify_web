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
  async (daysBeforeExpiry = 7, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/plans/expiring-users?daysBeforeExpiry=${daysBeforeExpiry}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users with expiring plans:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch expiring users";
      toast.error(errorMessage);
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
  },
  reducers: {
    clearPlanStore: (state) => {
      state.plansList = [];
      state.expiringUsers = [];
      state.selectedPlan = null;
      state.error = null;
      state.loading = false;
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
      });
  },
});

export const { clearPlanStore } = planSlice.actions;

export default planSlice.reducer;