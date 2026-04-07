// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/users/login`, userData);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Login failed');
//     }
//   }
// );

// // Async thunk for forgot password (send OTP)
// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/users/forgot-password`, { email });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to send OTP');
//     }
//   }
// );

// // Async thunk for verify OTP
// export const verifyOTP = createAsyncThunk(
//   'auth/verifyOTP',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/users/verify-otp`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to verify OTP');
//     }
//   }
// );

// // Async thunk for reset password
// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/users/forgot-password-reset`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to reset password');
//     }
//   }
// );

// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'), // Fix: Add this
//   role_id: JSON.parse(localStorage.getItem('user'))?.role_id || null,
//   resetEmail: null,
//   otpVerified: false,
//   isLoading: false,
//   error: null,
//   success: false,
//   message: null
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false; 
//       state.role_id = null; 
//       state.isLoading = false;
//       state.error = null;
//       state.success = false;
//       state.message = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },
//     setResetEmail: (state, action) => {
//       state.resetEmail = action.payload;
//     },
//     setOTPVerified: (state, action) => {
//       state.otpVerified = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true; // Fix: Set to true
//         state.role_id = action.payload.user?.role_id; // Fix: Set role_id
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.message || 'Login failed';
//         state.success = false;
//         state.isAuthenticated = false; // Fix: Set to false
//       })

//       // Forgot Password cases
//       .addCase(forgotPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.success = true;
//         state.message = action.payload?.message || 'OTP sent successfully';
//         state.error = null;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.message || 'Failed to send OTP';
//         state.success = false;
//       })

//       // Verify OTP cases
//       .addCase(verifyOTP.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(verifyOTP.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.success = true;
//         state.otpVerified = true;
//         state.message = action.payload?.message || 'OTP verified successfully';
//         state.error = null;
//       })
//       .addCase(verifyOTP.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.message || 'Failed to verify OTP';
//         state.success = false;
//         state.otpVerified = false;
//       })

//       // Reset Password cases
//       .addCase(resetPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.success = true;
//         state.message = action.payload?.message || 'Password reset successful';
//         state.error = null;
//         state.otpVerified = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.message || 'Failed to reset password';
//         state.success = false;
//       });
//   },
// });

// export const { logout, clearError, clearMessage, setResetEmail, setOTPVerified } = authSlice.actions;
// export default authSlice.reducer;









import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Async thunk for forgot password (send OTP)
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/forgot-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to send OTP');
    }
  }
);

// Async thunk for verify OTP
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/verify-otp`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to verify OTP');
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/forgot-password-reset`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to reset password');
    }
  }
);

// NEW: Async thunk for verify email OTP
export const verifyEmailOTP = createAsyncThunk(
  'auth/verifyEmailOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/verify-email-otp`, { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to verify email OTP');
    }
  }
);

// NEW: Async thunk for resend email OTP
export const resendEmailOTP = createAsyncThunk(
  'auth/resendEmailOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/resend-email-otp`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to resend email OTP');
    }
  }
);



// ========== NEW IMPERSONATION CONTROLLERS ==========

// Async thunk for impersonate user (Super Admin only)
export const impersonateUser = createAsyncThunk(
  'auth/impersonateUser',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${BASE_URL}/users/impersonate`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Store impersonation token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isImpersonating', 'true');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Impersonation failed');
    }
  }
);

// Async thunk for stop impersonation
export const stopImpersonation = createAsyncThunk(
  'auth/stopImpersonation',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${BASE_URL}/users/stop-impersonation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Restore original token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.removeItem('isImpersonating');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to stop impersonation');
    }
  }
);

// Async thunk for get impersonation status
export const getImpersonationStatus = createAsyncThunk(
  'auth/getImpersonationStatus',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${BASE_URL}/users/impersonation-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get impersonation status');
    }
  }
);

// ========== END OF NEW IMPERSONATION CONTROLLERS ==========


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  role_id: JSON.parse(localStorage.getItem('user'))?.role_id || null,
  resetEmail: null,
  otpVerified: false,
  isLoading: false,
  error: null,
  success: false,
  message: null,
  // New state for email verification
  isEmailVerified: false,
  emailVerificationMessage: null,
  emailVerificationError: null,

  // ========== NEW IMPERSONATION STATE ==========
  isImpersonating: localStorage.getItem('isImpersonating') === 'true' || false,
  impersonatedBy: null,
  originalUser: null,
  impersonationStatus: null,
  // ========== END OF NEW IMPERSONATION STATE ==========
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role_id = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.isEmailVerified = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    setOTPVerified: (state, action) => {
      state.otpVerified = action.payload;
    },
    // New reducer to clear email verification states
    clearEmailVerificationState: (state) => {
      state.emailVerificationMessage = null;
      state.emailVerificationError = null;
    },
    // ========== NEW IMPERSONATION REDUCERS ==========
    clearImpersonationState: (state) => {
      state.impersonationStatus = null;
      state.impersonationError = null;
    },
    // ========== END OF NEW IMPERSONATION REDUCERS ==========
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.role_id = action.payload.user?.role_id;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
        state.success = false;
        state.isAuthenticated = false;
      })

      // Forgot Password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload?.message || 'OTP sent successfully';
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to send OTP';
        state.success = false;
      })

      // Verify OTP cases
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.otpVerified = true;
        state.message = action.payload?.message || 'OTP verified successfully';
        state.error = null;
      })
      // .addCase(verifyOTP.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload?.message || 'Failed to verify OTP';
      //   state.success = false;
      //   state.otpVerified = false;
      // })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to verify OTP';
        state.success = false;
        state.otpVerified = false;
      })
      // Reset Password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload?.message || 'Password reset successful';
        state.error = null;
        state.otpVerified = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to reset password';
        state.success = false;
      })

      // NEW: Verify Email OTP cases
      .addCase(verifyEmailOTP.pending, (state) => {
        state.isLoading = true;
        state.emailVerificationError = null;
        state.emailVerificationMessage = null;
      })
      .addCase(verifyEmailOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEmailVerified = true;
        state.emailVerificationMessage = action.payload?.message || 'Email verified successfully';
        state.emailVerificationError = null;
        state.message = action.payload?.message;
        state.success = true;
      })
      .addCase(verifyEmailOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.emailVerificationError = action.payload?.message || 'Failed to verify email OTP';
        state.isEmailVerified = false;
        state.success = false;
      })

      // NEW: Resend Email OTP cases
      .addCase(resendEmailOTP.pending, (state) => {
        state.isLoading = true;
        state.emailVerificationError = null;
        state.emailVerificationMessage = null;
      })
      .addCase(resendEmailOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailVerificationMessage = action.payload?.message || 'OTP resent successfully';
        state.emailVerificationError = null;
        state.message = action.payload?.message;
        state.success = true;
      })
      .addCase(resendEmailOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.emailVerificationError = action.payload?.message || 'Failed to resend email OTP';
        state.success = false;
      })

      // ========== NEW IMPERSONATION CASES ==========

      // Impersonate User cases
      .addCase(impersonateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.impersonationError = null;
      })
      .addCase(impersonateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.role_id = action.payload.user?.role_id;
        state.isImpersonating = true;
        state.impersonatedBy = action.payload.impersonatedBy || null;
        state.originalUser = action.payload.originalUser || null;
        state.success = true;
        state.message = action.payload?.message || 'Impersonation successful';
        state.error = null;
      })
      .addCase(impersonateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Impersonation failed';
        state.impersonationError = action.payload?.message || 'Impersonation failed'; // Add this
        state.success = false;
        state.isImpersonating = false;
      })

      // Stop Impersonation cases
      .addCase(stopImpersonation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(stopImpersonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.role_id = action.payload.user?.role_id;
        state.isImpersonating = false;
        state.impersonatedBy = null;
        state.originalUser = null;
        state.success = true;
        state.message = action.payload?.message || 'Returned to admin session';
        state.error = null;

        // Remove impersonation flag from localStorage
        localStorage.removeItem('isImpersonating');
      })
      .addCase(stopImpersonation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to stop impersonation';
        state.success = false;
      })

      // Get Impersonation Status cases
      .addCase(getImpersonationStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getImpersonationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.impersonationStatus = action.payload;
        state.isImpersonating = action.payload.isImpersonated || false;
        state.impersonatedBy = action.payload.impersonatedBy || null;
        state.originalUser = action.payload.originalUser || null;
        state.success = true;
      })
      .addCase(getImpersonationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to get impersonation status';
        state.success = false;
      });
    // ========== END OF NEW IMPERSONATION CASES ==========

  },
});

export const {
  logout,
  clearError,
  clearMessage,
  setResetEmail,
  setOTPVerified,
  clearEmailVerificationState
} = authSlice.actions;

export default authSlice.reducer;