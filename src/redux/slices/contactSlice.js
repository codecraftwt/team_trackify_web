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

// Define the initial state
const initialState = {
  contacts: [],
  contact: {}, 
  loading: false,
  error: null,
  loadingContact: false,
  errorContact: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalContacts: 0,
  },
};

// Define the thunks
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/contacts", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getContacts = createAsyncThunk(
  "contact/getContacts",
  async ({ page = 1, limit = 10, fromDate, toDate }, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;

      const response = await api.get("/contacts", { params });
      return response.data;
    } catch (error) {
      // console.log("Error fetching contacts:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getContactById = createAsyncThunk(
  "contact/getContactById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateContactStatus = createAsyncThunk(
  "contact/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/contacts/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define the slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts || [];
        state.pagination.page = action.payload.page || 1;
        state.pagination.totalPages = action.payload.totalPages || 1;
        state.pagination.totalContacts = action.payload.totalContacts || 0;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContactById.pending, (state) => {
        state.loadingContact = true;
        state.errorContact = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loadingContact = false;
        state.contact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loadingContact = false;
        state.errorContact = action.payload;
      })
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message || "Status updated successfully");
        // Update the specific contact in the state
        state.contacts = state.contacts.map((contact) =>
          contact._id === action.payload.contact?._id
            ? action.payload.contact
            : contact
        );
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update contact status";
      });
  },
});

// Export the actions and reducer
export default contactSlice.reducer;