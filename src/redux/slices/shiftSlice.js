import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: BASE_URL,
});

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

export const fetchShifts = createAsyncThunk(
    "shift/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/shifts");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch shifts"
            );
        }
    }
);

export const createShift = createAsyncThunk(
    "shift/create",
    async (shiftData, { rejectWithValue }) => {
        try {
            const response = await api.post("/shifts/declare", shiftData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create shift"
            );
        }
    }
);

export const updateShift = createAsyncThunk(
    "shift/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/shifts/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update shift"
            );
        }
    }
);

export const deleteShift = createAsyncThunk(
    "shift/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/shifts/${id}`);
            return { id, data: response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete shift"
            );
        }
    }
);

export const assignShiftToUser = createAsyncThunk(
    "shift/assign",
    async ({ userId, shiftId }, { rejectWithValue }) => {
        try {
            const response = await api.post("/shifts/assign", { userId, shiftId });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to assign shift"
            );
        }
    }
);

const shiftSlice = createSlice({
    name: "shift",
    initialState: {
        shifts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShifts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShifts.fulfilled, (state, action) => {
                state.loading = false;
                state.shifts = action.payload?.data || [];
            })
            .addCase(fetchShifts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createShift.pending, (state) => {
                state.loading = true;
            })
            .addCase(createShift.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.shifts.push(action.payload.data);
                }
            })
            .addCase(createShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateShift.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateShift.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.shifts.findIndex((s) => s._id === action.payload?.data?._id);
                if (index !== -1 && action.payload?.data) {
                    state.shifts[index] = action.payload.data;
                }
            })
            .addCase(updateShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteShift.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteShift.fulfilled, (state, action) => {
                state.loading = false;
                state.shifts = state.shifts.filter((s) => s._id !== action.payload.id);
            })
            .addCase(deleteShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default shiftSlice.reducer;
