// src/redux/slices/couponSlice.js
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

// Async thunks for coupon API calls

// Create Coupon (Super Admin only)
export const createCoupon = createAsyncThunk(
  "coupon/create",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await api.post("/coupon", couponData);
      toast.success("Coupon created successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create coupon";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get All Coupons
export const getAllCoupons = createAsyncThunk(
  "coupon/getAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/coupon/${queryString ? `?${queryString}` : ''}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch coupons";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Coupon By ID
export const getCouponById = createAsyncThunk(
  "coupon/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/coupon/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch coupon";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Coupon (Super Admin only)
export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/coupon/${id}`, data);
      toast.success("Coupon updated successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update coupon";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Coupon (Super Admin only)
export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/coupon/${id}`);
      toast.success("Coupon deleted successfully!");
      return { id, ...response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete coupon";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Validate Coupon
export const validateCoupon = createAsyncThunk(
  "coupon/validate",
  async ({ code, amount }, { rejectWithValue }) => {
    try {
      const response = await api.post("/coupon/validate", { code, amount });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid coupon";
      return rejectWithValue({ message: errorMessage, error: error.response?.data });
    }
  }
);

const initialState = {
  coupons: [],
  currentCoupon: null,
  loading: false,
  error: null,
  
  // Validation state
  validationLoading: false,
  validationResult: null,
  validationError: null,
  
  // CRUD operation states
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  
  // Pagination and stats
  stats: {
    totalCoupons: 0,
    activeCoupons: 0,
    inactiveCoupons: 0,
    percentageCoupons: 0,
    fixedCoupons: 0,
    totalUsedCount: 0
  },
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  },
  
  // Filters
  filters: {
    status: '',
    discountType: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCouponError: (state) => {
      state.error = null;
    },
    clearValidationResult: (state) => {
      state.validationResult = null;
      state.validationError = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentCoupon: (state) => {
      state.currentCoupon = null;
    }
  },
  extraReducers: (builder) => {
    // Create Coupon
    builder
      .addCase(createCoupon.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.createLoading = false;
        state.coupons.unshift(action.payload.data);
        toast.success("Coupon created successfully!");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });

    // Get All Coupons
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.data || [];
        state.stats = action.payload.stats || initialState.stats;
        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Coupon By ID
    builder
      .addCase(getCouponById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCoupon = action.payload.data;
      })
      .addCase(getCouponById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Coupon
    builder
      .addCase(updateCoupon.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.coupons.findIndex(c => c._id === action.payload.data._id);
        if (index !== -1) {
          state.coupons[index] = action.payload.data;
        }
        if (state.currentCoupon?._id === action.payload.data._id) {
          state.currentCoupon = action.payload.data;
        }
        toast.success("Coupon updated successfully!");
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });

    // Delete Coupon
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.coupons = state.coupons.filter(c => c._id !== action.payload.id);
        if (state.currentCoupon?._id === action.payload.id) {
          state.currentCoupon = null;
        }
        toast.success("Coupon deleted successfully!");
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });

    // Validate Coupon
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.validationLoading = true;
        state.validationResult = null;
        state.validationError = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.validationLoading = false;
        state.validationResult = action.payload.data;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.validationLoading = false;
        state.validationError = action.payload;
      });
  }
});

export const {
  clearCouponError,
  clearValidationResult,
  setFilters,
  resetFilters,
  clearCurrentCoupon
} = couponSlice.actions;

export default couponSlice.reducer;