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


// export const createPaymentOrder = createAsyncThunk(
//   "payment/createOrder",
//   async ({ adminId, planId, couponCode }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/payments/create-order", {
//         adminId,
//         planId,
//         couponCode, // Added coupon code support
//       });

//       if (couponCode && response.data.data.discountApplied) {
//         toast.success(`Coupon applied! You saved ₹${response.data.data.discountAmount}`);
//       }

//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create order");
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// export const verifyPayment = createAsyncThunk(
//   "payment/verifyPayment",
//   async (
//     { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.post("/payments/verify-payment", {
//         razorpayOrderId,
//         razorpayPaymentId,
//         razorpaySignature,
//         paymentId,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async ({ adminId, planId, couponCode }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payments/create-order", {
        adminId,
        planId,
        couponCode, // Added coupon code support
      });

      if (couponCode && response.data.data.discountApplied) {
        // toast.success(`Coupon applied! You saved ₹${response.data.data.discountAmount}`);
      }

      return response.data;
    } catch (error) {
      // toast.error(error.response?.data?.message || "Failed to create order");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (
    { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/payments/verify-payment", {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        paymentId,
      });

      // toast.success(response.data.message || "Payment verified successfully");

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify payment");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const getPaymentHistory = createAsyncThunk(
//   "payment/getHistory",
//   async ({ adminId, page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await api.get(
//         `/payments/history/${adminId}?page=${page}&limit=${limit}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
export const getPaymentHistory = createAsyncThunk(
  "payment/getHistory",
  async ({ adminId, page = 1, limit = 10, search, startDate, endDate, status }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (search) params.append('search', search);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (status && status !== 'all') params.append('status', status);
      
      const response = await api.get(
        `/payments/history/${adminId}?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllPaymentHistory = createAsyncThunk(
  "payment/getAllPaymentHistory",
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
      const url = `/payments/history${queryString ? `?${queryString}` : ''}`;

      // console.log("API Request:", url);

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRevenueSummary = createAsyncThunk(
  "payment/getRevenueSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/revenue-summary");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Create add-on order with coupon support
export const createAddOnOrder = createAsyncThunk(
  'payment/createAddOnOrder',
  async ({ adminId, addOnPlanId, paymentId, couponCode }, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/create-addon-order', {
        adminId,
        addOnPlanId,
        paymentId, // Now required and being sent to backend
        couponCode: couponCode || null,
      });

      // Optional: Add toast for coupon success
      if (couponCode && response.data.data?.discountApplied) {
        toast.success(`Coupon applied! You saved ₹${response.data.data.discountAmount / 100}`);
      }

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create add-on order';

      // Optional: Add specific error toasts
      if (errorMessage.includes('active subscription')) {
        // toast.error('You need an active subscription to purchase add-ons');
      } else {
        // toast.error(errorMessage);
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify add-on payment
export const verifyAddOnPayment = createAsyncThunk(
  'payment/verifyAddOnPayment',
  async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/verify-addon-payment', {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        paymentId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Test API call
export const testPaymentAPI = createAsyncThunk(
  "payment/testAPI",
  async (testData, { rejectWithValue }) => {
    try {
      const response = await api.post("/payments/test", testData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add this after your existing exports
export const updatePaymentStatus = createAsyncThunk(
  "payment/updateStatus",
  async ({ razorpayOrderId, status, failureReason }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payments/update-payment-status", {
        razorpayOrderId,
        status,
        failureReason,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  // Order creation
  orderLoading: false,
  orderError: null,
  orderData: null,

  // Payment verification
  verificationLoading: false,
  verificationError: null,
  verificationData: null,

  // Payment history
  historyLoading: false,
  historyError: null,
  paymentHistory: [],

  // All payment history (Super Admin view)
  allPaymentHistory: [],
  allPaymentHistoryLoading: false,
  allPaymentHistoryError: null,

  totalCompletedAmount: 0,
  numberOfPaidUsers: 0,
  averageRevenue: 0,
  totalDiscountGiven: 0,

  totalPlanCount: 0,
  totalAddOnCount: 0,
  totalPlanAmount: 0,
  totalAddOnAmount: 0,
  totalWithAll: 0,

  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  statusUpdateLoading: false,
  statusUpdateError: null,

  paymentStats: {
    totalPayments: 0,
    totalAmount: 0,
    pendingCount: 0,
    completedCount: 0,
  },

  revenueSummary: null,
  revenueLoading: false,
  revenueError: null,

  // Payment details
  paymentDetailsLoading: false,
  paymentDetailsError: null,
  paymentDetails: null,

  // Add-On Payment states
  addOnOrderLoading: false,
  addOnOrderError: null,
  addOnOrderData: null,

  addOnVerificationLoading: false,
  addOnVerificationError: null,
  addOnVerificationData: null,



  // Test API
  testLoading: false,
  testError: null,
  testData: null,

  // General payment state
  paymentStatus: "idle", // idle, processing, success, failed
  currentPayment: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.orderError = null;
      state.verificationError = null;
      state.historyError = null;
      state.paymentDetailsError = null;
      state.testError = null;
      state.paymentStatus = "idle";
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.orderError = null;
    },
    clearVerificationData: (state) => {
      state.verificationData = null;
      state.verificationError = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.paymentStatus = "processing";
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
        state.paymentStatus = "failed";
      });

    // Verify Payment
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.verificationLoading = true;
        state.verificationError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verificationLoading = false;
        state.verificationData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verificationLoading = false;
        state.verificationError = action.payload;
        state.paymentStatus = "failed";
      });

    // Get Payment History
    builder
      // .addCase(getPaymentHistory.pending, (state) => {
      //   state.historyLoading = true;
      //   state.historyError = null;
      // })
      // .addCase(getPaymentHistory.fulfilled, (state, action) => {
      //   state.historyLoading = false;
      //   const { data, pagination, paymentStats } = action.payload;
      //   state.paymentHistory = data || [];
      //   state.currentPage = pagination?.page || 1;
      //   state.totalPages = pagination?.totalPages || 1;
      //   state.totalItems = pagination?.totalItems || 0;
      //   state.paymentStats = paymentStats || {
      //     totalPayments: 0,
      //     totalAmount: 0,
      //     pendingCount: 0,
      //     completedCount: 0,
      //   };
      // })
      // .addCase(getPaymentHistory.rejected, (state, action) => {
      //   state.historyLoading = false;
      //   state.historyError = action.payload;
      // });

    
    // Get Payment History - UPDATED for new response structure
builder
  .addCase(getPaymentHistory.pending, (state) => {
    state.historyLoading = true;
    state.historyError = null;
  })
  .addCase(getPaymentHistory.fulfilled, (state, action) => {
    state.historyLoading = false;
    const payload = action.payload;
    
    // Check if it's the new response structure
    if (payload.statusCounts) {
      // New response structure
      state.paymentHistory = payload.data || [];
      state.currentPage = payload.pagination?.page || 1;
      state.totalPages = payload.pagination?.totalPages || 1;
      state.totalItems = payload.pagination?.totalItems || 0;
      
      // Store all new statistics
      state.totalCompletedAmount = payload.totalCompletedAmount || 0;
      state.totalPendingAmount = payload.totalPendingAmount || 0;
      state.totalCancelledAmount = payload.totalCancelledAmount || 0;
      state.totalFailedAmount = payload.totalFailedAmount || 0;
      state.totalDiscountGiven = payload.totalDiscountGiven || 0;
      state.totalPlanCount = payload.totalPlanCount || 0;
      state.totalAddOnCount = payload.totalAddOnCount || 0;
      state.totalPlanAmount = payload.totalPlanAmount || 0;
      state.totalAddOnAmount = payload.totalAddOnAmount || 0;
      state.totalWithAll = payload.totalWithAll || 0;
      
      // Update paymentStats for backward compatibility
      state.paymentStats = {
        totalPayments: payload.statusCounts?.all || 0,
        totalAmount: payload.totalCompletedAmount || 0,
        pendingCount: payload.statusCounts?.pending || 0,
        completedCount: payload.statusCounts?.completed || 0,
      };
      
      // Store status counts
      state.statusCounts = payload.statusCounts || {};
    } else {
      // Old response structure (fallback)
      const { data, pagination, paymentStats } = payload;
      state.paymentHistory = data || [];
      state.currentPage = pagination?.page || 1;
      state.totalPages = pagination?.totalPages || 1;
      state.totalItems = pagination?.totalItems || 0;
      state.paymentStats = paymentStats || {
        totalPayments: 0,
        totalAmount: 0,
        pendingCount: 0,
        completedCount: 0,
      };
    }
  })
  .addCase(getPaymentHistory.rejected, (state, action) => {
    state.historyLoading = false;
    state.historyError = action.payload;
  });
      // Get All Payment History (Admin + Plans Overview)
    builder
      .addCase(getAllPaymentHistory.pending, (state) => {
        state.allPaymentHistoryLoading = true;
        state.allPaymentHistoryError = null;
      })
      // .addCase(getAllPaymentHistory.fulfilled, (state, action) => {
      //   state.allPaymentHistoryLoading = false;
      //   const {
      //     data,
      //     totalCompletedAmount,
      //     numberOfPaidUsers,
      //     averageRevenue,
      //     pagination,
      //   } = action.payload;

      //   state.allPaymentHistory = data || [];
      //   state.totalCompletedAmount = totalCompletedAmount || 0;
      //   state.numberOfPaidUsers = numberOfPaidUsers || 0;
      //   state.averageRevenue = averageRevenue || 0;

      //   state.currentPage = pagination?.page || 1;
      //   state.totalPages = pagination?.totalPages || 1;
      //   state.totalItems = pagination?.totalItems || 0;
      // })
      // .addCase(getAllPaymentHistory.rejected, (state, action) => {
      //   state.allPaymentHistoryLoading = false;
      //   state.allPaymentHistoryError = action.payload;
      // });
      // .addCase(getAllPaymentHistory.fulfilled, (state, action) => {
      //   state.allPaymentHistoryLoading = false;
      //   const {
      //     data,
      //     totalCompletedAmount,
      //     numberOfPaidUsers,
      //     averageRevenue,
      //     totalDiscountGiven,
      //     pagination,
      //   } = action.payload;

      //   state.allPaymentHistory = data || [];
      //   state.totalCompletedAmount = totalCompletedAmount || 0;
      //   state.numberOfPaidUsers = numberOfPaidUsers || 0;
      //   state.averageRevenue = averageRevenue || 0;
      //   state.totalDiscountGiven = totalDiscountGiven || 0;

      //   state.currentPage = pagination?.page || 1;
      //   state.totalPages = pagination?.totalPages || 1;
      //   state.totalItems = pagination?.totalItems || 0;
      // })
      .addCase(getAllPaymentHistory.fulfilled, (state, action) => {
        state.allPaymentHistoryLoading = false;
        const {
          data,
          totalCompletedAmount,
          numberOfPaidUsers,
          averageRevenue,
          totalDiscountGiven,
          totalPlanCount,      // ← ADD THIS
          totalAddOnCount,     // ← ADD THIS
          totalPlanAmount,     // ← ADD THIS
          totalAddOnAmount,    // ← ADD THIS
          totalWithAll,        // ← ADD THIS
          pagination,
        } = action.payload;

        state.allPaymentHistory = data || [];
        state.totalCompletedAmount = totalCompletedAmount || 0;
        state.numberOfPaidUsers = numberOfPaidUsers || 0;
        state.averageRevenue = averageRevenue || 0;
        state.totalDiscountGiven = totalDiscountGiven || 0;

        // ← ADD THESE NEW STATE PROPERTIES
        state.totalPlanCount = totalPlanCount || 0;
        state.totalAddOnCount = totalAddOnCount || 0;
        state.totalPlanAmount = totalPlanAmount || 0;
        state.totalAddOnAmount = totalAddOnAmount || 0;
        state.totalWithAll = totalWithAll || 0;

        state.currentPage = pagination?.page || 1;
        state.totalPages = pagination?.totalPages || 1;
        state.totalItems = pagination?.totalItems || 0;
      })
      .addCase(getAllPaymentHistory.rejected, (state, action) => {
        state.allPaymentHistoryLoading = false;
        state.allPaymentHistoryError = action.payload;
      });
    builder
      .addCase(getRevenueSummary.pending, (state) => {
        state.revenueLoading = true;
        state.revenueError = null;
      })
      .addCase(getRevenueSummary.fulfilled, (state, action) => {
        state.revenueLoading = false;
        state.revenueSummary = action.payload;
      })
      .addCase(getRevenueSummary.rejected, (state, action) => {
        state.revenueLoading = false;
        state.revenueError = action.payload;
      });

    // Get Payment By ID
    builder
      .addCase(getPaymentById.pending, (state) => {
        state.paymentDetailsLoading = true;
        state.paymentDetailsError = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.paymentDetailsLoading = false;
        state.paymentDetails = action.payload.data;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.paymentDetailsLoading = false;
        state.paymentDetailsError = action.payload;
      });

    // Add-On Order creation
    builder
      .addCase(createAddOnOrder.pending, (state) => {
        state.addOnOrderLoading = true;
        state.addOnOrderError = null;
      })
      .addCase(createAddOnOrder.fulfilled, (state, action) => {
        state.addOnOrderLoading = false;
        state.addOnOrderData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(createAddOnOrder.rejected, (state, action) => {
        state.addOnOrderLoading = false;
        state.addOnOrderError = action.payload;
        state.paymentStatus = "failed";
      });

    // Add-On Payment Verification
    builder
      .addCase(verifyAddOnPayment.pending, (state) => {
        state.addOnVerificationLoading = true;
        state.addOnVerificationError = null;
      })
      .addCase(verifyAddOnPayment.fulfilled, (state, action) => {
        state.addOnVerificationLoading = false;
        state.addOnVerificationData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(verifyAddOnPayment.rejected, (state, action) => {
        state.addOnVerificationLoading = false;
        state.addOnVerificationError = action.payload;
        state.paymentStatus = "failed";
      });

    // Test API
    builder
      .addCase(testPaymentAPI.pending, (state) => {
        state.testLoading = true;
        state.testError = null;
      })
      .addCase(testPaymentAPI.fulfilled, (state, action) => {
        state.testLoading = false;
        state.testData = action.payload;
      })
      .addCase(testPaymentAPI.rejected, (state, action) => {
        state.testLoading = false;
        state.testError = action.payload;
      })

      .addCase(updatePaymentStatus.pending, (state) => {
        state.statusUpdateLoading = true;
        state.statusUpdateError = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        // Update payment in history if exists
        if (state.paymentHistory.length > 0) {
          const updatedPayment = action.payload.data;
          const index = state.paymentHistory.findIndex(
            p => p.razorpayOrderId === updatedPayment.razorpayOrderId
          );
          if (index !== -1) {
            state.paymentHistory[index].status = updatedPayment.status;
          }
        }
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.statusUpdateError = action.payload;
      });
  },
});

export const {
  clearPaymentState,
  setPaymentStatus,
  clearOrderData,
  clearVerificationData,
} = paymentSlice.actions;

export default paymentSlice.reducer;