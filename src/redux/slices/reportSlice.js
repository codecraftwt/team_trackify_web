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

const initialState = {
  reports: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  },
};

// Thunk to fetch reports for admin with optional date, page, limit
export const getReportsByAdmin = createAsyncThunk(
  "reports/getReportsByAdmin",
  async (
    { fromDate, toDate, page = 1, limit = 10, search } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = { page, limit };
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;
      if (search) params.search = search;

      const response = await api.get("/reports/admin", { params });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch reports";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearReports: (state) => {
      state.reports = [];
      state.error = null;
      state.pagination = {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReportsByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportsByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data || [];
        state.pagination = {
          page: action.payload.pagination?.page || 1,
          limit: action.payload.pagination?.limit || 10,
          totalItems: action.payload.pagination?.totalItems || 0,
          totalPages: action.payload.pagination?.totalPages || 1,
        };
      })
      .addCase(getReportsByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch reports";
      });
  },
});

export const { clearReports } = reportSlice.actions;

export default reportSlice.reducer;