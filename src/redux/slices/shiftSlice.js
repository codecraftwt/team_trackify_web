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

export const fetchShiftHistory = createAsyncThunk(
    "shift/fetchHistory",
    async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/shifts/history/all?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch shift history"
            );
        }
    }
);

export const fetchUserShiftHistory = createAsyncThunk(
    "shift/fetchUserHistory",
    async ({ userId, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/shifts/history/user/${userId}?page=${page}&limit=${limit}`);
            return { userId, data: response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user shift history"
            );
        }
    }
);

const shiftSlice = createSlice({
    name: "shift",
    initialState: {
        shifts: [],
        history: [],
        userHistoryLogs: {}, // { [userId]: { logs: [], pagination: {}, loading: false } }
        pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
        loading: false,
        historyLoading: false,
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

            // Fetch History
            .addCase(fetchShiftHistory.pending, (state) => {
                state.historyLoading = true;
                state.error = null;
            })
            .addCase(fetchShiftHistory.fulfilled, (state, action) => {
                state.historyLoading = false;
                state.history = action.payload?.data || [];
                if (action.payload?.pagination) {
                    state.pagination = action.payload.pagination;
                }
            })
            .addCase(fetchShiftHistory.rejected, (state, action) => {
                state.historyLoading = false;
                state.error = action.payload;
            })

            // Fetch User History
            .addCase(fetchUserShiftHistory.pending, (state, action) => {
                const { userId } = action.meta.arg;
                if (!state.userHistoryLogs[userId]) {
                    state.userHistoryLogs[userId] = { logs: [], pagination: {}, loading: true };
                } else {
                    state.userHistoryLogs[userId].loading = true;
                }
            })
            .addCase(fetchUserShiftHistory.fulfilled, (state, action) => {
                const { userId, data } = action.payload;
                const { page } = action.meta.arg;
                
                if (state.userHistoryLogs[userId]) {
                    state.userHistoryLogs[userId].loading = false;
                    if (page === 1) {
                        state.userHistoryLogs[userId].logs = data?.data || [];
                    } else {
                        // Append new logs for pagination
                        state.userHistoryLogs[userId].logs = [
                            ...state.userHistoryLogs[userId].logs,
                            ...(data?.data || [])
                        ];
                    }
                    if (data?.pagination) {
                        state.userHistoryLogs[userId].pagination = data.pagination;
                    }
                }
            })
            .addCase(fetchUserShiftHistory.rejected, (state, action) => {
                const { userId } = action.meta.arg;
                if (state.userHistoryLogs[userId]) {
                    state.userHistoryLogs[userId].loading = false;
                }
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
