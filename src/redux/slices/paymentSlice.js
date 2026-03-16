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
        toast.success(`Coupon applied! You saved ₹${response.data.data.discountAmount}`);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
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

      toast.success(response.data.message || "Payment verified successfully");

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify payment");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPaymentHistory = createAsyncThunk(
  "payment/getHistory",
  async ({ adminId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/payments/history/${adminId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const getAllPaymentHistory = createAsyncThunk(
//   "payment/getAllPaymentHistory",
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const queryString = new URLSearchParams(params).toString();
//       const response = await api.get(
//         `/payments/history${queryString ? `?${queryString}` : ''}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// Get all payment history (with filters) - OPTIMIZED
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

      console.log("API Request:", url);

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

// Add-On Payment API calls
// export const createAddOnOrder = createAsyncThunk(
//   "payment/createAddOnOrder",
//   async ({ adminId, addOnPlanId, paymentId }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/payments/create-addon-order", {
//         adminId,
//         addOnPlanId,
//         paymentId,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// Create add-on order with coupon support

// export const createAddOnOrder = createAsyncThunk(
//   "payment/createAddOnOrder",
//   async ({ adminId, addOnPlanId, couponCode }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/payments/create-addon-order", {
//         adminId,
//         addOnPlanId,
//         couponCode, // Optional coupon code
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// export const verifyAddOnPayment = createAsyncThunk(
//   "payment/verifyAddOnPayment",
//   async (
//     { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.post("/payments/verify-addon-payment", {
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
// Create Razorpay order for add-on with coupon support (maintaining old payment structure)
// const createAddOnOrder = async (req, res) => {
//   try {
//     console.log("===== CREATE ADD-ON ORDER REQUEST =====");
//     console.log("Request body:", req.body);

//     const { adminId, addOnPlanId, paymentId, couponCode } = req.body;

//     // Validate required fields
//     if (!adminId || !addOnPlanId || !paymentId) {
//       return res.status(400).json({
//         success: false,
//         message: "adminId, addOnPlanId, and paymentId are required",
//       });
//     }

//     // Fetch admin, add-on plan, and existing payment
//     console.log("Fetching admin, add-on plan, and payment from database...");
//     const [admin, addOnPlan, existingPayment] = await Promise.all([
//       User.findById(adminId),
//       Plan.findById(addOnPlanId),
//       Payment.findById(paymentId),
//     ]);

//     if (!admin || !addOnPlan || !existingPayment) {
//       return res.status(404).json({
//         success: false,
//         message: !admin 
//           ? "Admin not found" 
//           : !addOnPlan 
//             ? "Add-On Plan not found" 
//             : "Payment record not found",
//       });
//     }

//     // Check admin role
//     if (admin.role_id !== 1) {
//       return res.status(403).json({
//         success: false,
//         message: "Only admins can purchase add-on plans",
//       });
//     }

//     // Check add-on price
//     if (addOnPlan.price <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Add-On Plan price must be greater than 0",
//       });
//     }

//     // Initialize amount variables
//     let finalAmount = addOnPlan.price;
//     let discountAmount = 0;
//     let coupon = null;
//     let originalAmount = addOnPlan.price;

//     // Apply coupon if provided
//     if (couponCode) {
//       console.log("Applying coupon with code:", couponCode);

//       // Find the coupon
//       coupon = await Coupon.findOne({ 
//         code: couponCode.toUpperCase(),
//         status: "active" 
//       });

//       if (!coupon) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid or inactive coupon code",
//         });
//       }

//       // Validate coupon against add-on plan price
//       const validation = coupon.isValid(addOnPlan.price);

//       if (!validation.valid) {
//         return res.status(400).json({
//           success: false,
//           message: validation.message,
//         });
//       }

//       // Calculate discount
//       const discount = coupon.calculateDiscount(addOnPlan.price);
//       finalAmount = discount.finalAmount;
//       discountAmount = discount.discountAmount;
//       console.log("Discount applied:", { finalAmount, discountAmount });
//     }

//     // Create Razorpay order for the add-on plan
//     console.log("Creating Razorpay order with amount:", Math.round(finalAmount * 100));

//     let order;
//     try {
//       order = await razorpay.orders.create({
//         amount: Math.round(finalAmount * 100),
//         currency: "INR",
//         receipt: `receipt_addon_${Date.now()}`,
//         notes: { 
//           adminId, 
//           addOnPlanId, 
//           planName: addOnPlan.name,
//           paymentId: paymentId,
//           couponCode: couponCode || null,
//           originalAmount: originalAmount,
//           discountAmount: discountAmount,
//           type: "addon"
//         },
//       });
//       console.log("Razorpay order created:", order.id);
//     } catch (razorpayError) {
//       console.error("Razorpay order creation failed:", razorpayError);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to create Razorpay order",
//         error: razorpayError.message,
//       });
//     }

//     // Calculate expiry date
//     const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//     console.log("Expiry date:", expiresAt);

//     // Update the existing payment with the add-on details (like old code)
//     existingPayment.razorpayOrderId = order.id;
//     existingPayment.addOns.push({
//       addOnPlanId: addOnPlan._id,
//       addOnAmount: finalAmount,
//       addOnOriginalAmount: originalAmount,
//       addOnDiscountAmount: discountAmount,
//       addOnCouponCode: couponCode || null,
//       addOnCouponId: coupon?._id,
//       addOnMaxUser: addOnPlan.maxUsers,
//       addOnDescription: addOnPlan.description,
//       addOnExpiry: expiresAt,
//       status: "pending", // Add status to track payment completion
//     });

//     // Update main payment fields if needed
//     existingPayment.amount = existingPayment.amount || 0 + finalAmount;
//     if (couponCode) {
//       existingPayment.couponCode = couponCode;
//       existingPayment.couponId = coupon?._id;
//     }

//     try {
//       await existingPayment.save();
//       console.log("Payment record updated with new add-on. Payment ID:", existingPayment._id);
//     } catch (saveError) {
//       console.error("Failed to update payment record:", saveError);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to update payment record",
//         error: saveError.message,
//       });
//     }

//     // Increment coupon used count
//     if (coupon) {
//       try {
//         coupon.usedCount += 1;
//         await coupon.save();
//         console.log("Coupon usage count incremented");
//       } catch (couponError) {
//         console.error("Failed to update coupon count:", couponError);
//         // Don't fail the request for this, just log it
//       }
//     }

//     console.log("===== ADD-ON ORDER CREATED SUCCESSFULLY =====");

//     res.status(200).json({
//       success: true,
//       message: "Add-On order created and payment details updated successfully",
//       data: {
//         orderId: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         receipt: order.receipt,
//         paymentId: existingPayment._id,
//         originalAmount: originalAmount * 100, // Convert to paise for consistency
//         discountAmount: discountAmount * 100,
//         finalAmount: finalAmount * 100,
//         couponCode: couponCode || null,
//         couponValid: coupon ? true : false,
//         discountApplied: discountAmount > 0,
//         addOnDetails: {
//           planId: addOnPlan._id,
//           planName: addOnPlan.name,
//           maxUsers: addOnPlan.maxUsers,
//           expiryDate: expiresAt,
//         }
//       },
//     });
//   } catch (error) {
//     console.error("===== UNEXPECTED ERROR IN CREATE ADD-ON ORDER =====");
//     console.error("Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Error creating add-on order",
//       error: error.message,
//     });
//   }
// };

// // Update the verification function to handle the new add-on structure
// const verifyAddOnPayment = async (req, res) => {
//   try {
//     const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } =
//       req.body;

//     // Verify signature
//     const body = razorpayOrderId + "|" + razorpayPaymentId;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpaySignature) {
//       return res.status(400).json({
//         success: false,
//         message: "Add-on payment verification failed: Signature mismatch",
//       });
//     }

//     // Fetch payment details from Razorpay API to confirm status
//     const paymentDetails = await razorpay.payments.fetch(razorpayPaymentId);

//     if (paymentDetails.status !== "captured") {
//       return res.status(400).json({
//         success: false,
//         message: `Add-on payment not successful. Status: ${paymentDetails.status}`,
//       });
//     }

//     // Find the payment record in DB
//     const payment = await Payment.findById(paymentId);
//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found",
//       });
//     }

//     // Check if there are add-ons
//     if (!payment.addOns || payment.addOns.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No add-ons found for this payment",
//       });
//     }

//     // Get the most recent add-on that matches the Razorpay order
//     const addOnIndex = payment.addOns.findIndex(
//       a => a.status === "pending" || !a.addOnPaymentId
//     );

//     if (addOnIndex === -1) {
//       return res.status(400).json({
//         success: false,
//         message: "No pending add-on found for verification",
//       });
//     }

//     const addOn = payment.addOns[addOnIndex];

//     // Update add-on details on successful payment
//     addOn.addOnPaymentId = razorpayPaymentId;
//     addOn.addOnPaymentSignature = razorpaySignature;
//     addOn.status = "completed";
//     addOn.paymentDate = new Date();

//     // Update maxUser if addOnMaxUser exists
//     if (typeof addOn.addOnMaxUser === "number") {
//       payment.maxUser = (payment.maxUser || 0) + addOn.addOnMaxUser;
//     }

//     await payment.save();

//     res.status(200).json({
//       success: true,
//       message: "Add-On payment verified and add-on updated successfully",
//       data: {
//         paymentId: payment._id,
//         status: "completed",
//         amount: payment.amount,
//         adminId: payment.adminId,
//         addOnDetails: {
//           ...addOn.toObject(),
//           planId: addOn.addOnPlanId,
//           amount: addOn.addOnAmount,
//           maxUsers: addOn.addOnMaxUser,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error verifying add-on payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error verifying add-on payment",
//       error: error.message,
//     });
//   }
// };

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
        toast.error('You need an active subscription to purchase add-ons');
      } else {
        toast.error(errorMessage);
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

  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

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
      .addCase(getPaymentHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        const { data, pagination, paymentStats } = action.payload;
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
      .addCase(getAllPaymentHistory.fulfilled, (state, action) => {
        state.allPaymentHistoryLoading = false;
        const {
          data,
          totalCompletedAmount,
          numberOfPaidUsers,
          averageRevenue,
          totalDiscountGiven,
          pagination,
        } = action.payload;

        state.allPaymentHistory = data || [];
        state.totalCompletedAmount = totalCompletedAmount || 0;
        state.numberOfPaidUsers = numberOfPaidUsers || 0;
        state.averageRevenue = averageRevenue || 0;
        state.totalDiscountGiven = totalDiscountGiven || 0;

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