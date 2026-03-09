// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// // Create axios instance with base URL
// const api = axios.create({
//   baseURL: BASE_URL,
// });

// // Add token to requests if it exists
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle User Login
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async ({ data }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/login", data);
//       const user = response?.data?.user;

//       if (![1, 2].includes(user?.role_id)) {
//         const errorMessage =
//           "You do not have the required permissions to log in.";
//         toast.error(errorMessage);
//         return rejectWithValue({ message: errorMessage });
//       }

//       localStorage.setItem("token", response?.data?.token);
//       localStorage.setItem("user", JSON.stringify(user));
//       toast.success(response?.data?.message);

//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Handle User Registration
// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/register", payload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Handle User Update
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ userId, formData }, { rejectWithValue }) => {
//     try {
//       const response = await api.patch(
//         `/users/updateuser/${userId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Fetch All Users
// export const getAllUsers = createAsyncThunk(
//   "user/getAllUsers",
//   async (adminId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/users/alluser/${adminId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Fetch Single User by ID
// export const getUserById = createAsyncThunk(
//   "user/getUserById",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/users/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Delete User
// export const deleteUser = createAsyncThunk(
//   "user/deleteUser",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api.delete(`/users/deleteuser/${userId}`);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const getUserCounts = createAsyncThunk(
//   "user/getUserCounts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/users/user-counts");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getAllAdmins = createAsyncThunk(
//   "user/getAllAdmins",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/users/alladmins");
//       return response.data?.admins;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const getUserTrack = createAsyncThunk(
//   "user/trackRecord",
//   async ({ id, date = "" }, { rejectWithValue }) => {
//     try {
//       const url = date
//         ? `/tracks/usertrack/${id}?date=${date}`
//         : `/tracks/usertrack/${id}`;

//       const response = await api.get(url);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Fetch all tracked dates for a user
// export const getUserTrackedDates = createAsyncThunk(
//   "user/getUserTrackedDates",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/tracks/user/${userId}/tracked-dates`);
//       return response.data.trackedDates; // returns array of "YYYY-MM-DD" strings
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getActiveUserLocations = createAsyncThunk(
//   "user/getActiveUserLocations",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/tracks/admin/active-user-locations");
//       return response.data.users; // Array of users with latest locations
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Failed to fetch locations"
//       );
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getLastFiveTrackedUsers = createAsyncThunk(
//   "user/getLastFiveTrackedUsers",
//   async (adminId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/tracks/last-five-tracked-users/${adminId}`);
//       return response.data.users;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Thunk to handle reset password API request
// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async ({ oldPassword, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/reset-password", {
//         oldPassword,
//         newPassword,
//       });

//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to reset password");
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// export const forgotPassword = createAsyncThunk(
//   "user/forgotPassword",
//   async ({ email }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/forgot-password", {
//         email,
//       });
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Add new verifyOtp thunk
// export const verifyOtp = createAsyncThunk(
//   "user/verifyOtp",
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/verify-otp", {
//         email,
//         otp,
//       });
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "OTP verification failed");
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Update your forgotPasswordReset thunk (replace the existing one)
// export const forgotPasswordReset = createAsyncThunk(
//   "user/forgotPasswordReset",
//   async ({ email, otp, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await api.post(
//         "/users/forgot-password-reset",
//         { email, otp, newPassword }
//       );
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to reset password");
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // User Slice
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     userInfo: JSON.parse(localStorage.getItem("user")) || {},
//     usersList: [],
//     totalUsers: null,
//     adminList: [],
//     userCounts: {},
//     userTrackInfo: [],
//     error: null,
//     trackedDates: [],
//     trackedDatesLoading: false,
//     trackedDatesError: null,
//     activeUserLocations: [],
//     activeUserLocationsLoading: false,
//     activeUserLocationsError: null,
//     lastTrackedUsers: [],
//     lastTrackedUsersLoading: false,
//     lastTrackedUsersError: null,
//     forgotPasswordLoading: false,
//     forgotPasswordError: null,
//     forgotPasswordSuccess: false,
//     verifyOtpLoading: false,
//     verifyOtpError: null,
//     verifyOtpSuccess: false,
//     resetToken: null,
//     resetPasswordLoading: false,
//     resetPasswordError: null,
//     resetPasswordSuccess: false,
//   },
//   reducers: {
//     logoutUser: (state) => {
//       state.userInfo = {};
//       state.usersList = [];
//       state.adminList = [];
//       state.userTrackInfo = [];
//       state.userCounts = {};
//       state.error = null;
//       state.loading = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//     setUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     clearResetStates: (state) => {
//       state.forgotPasswordSuccess = false;
//       state.verifyOtpSuccess = false;
//       state.resetPasswordSuccess = false;
//       state.resetToken = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUserTrack.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserTrack.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userTrackInfo = action.payload?.user;
//       })
//       .addCase(getUserTrack.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log("Login completed..", action.payload);
//         state.loading = false;
//         state.userInfo = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         console.log("Login Failed..", action.payload);
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle Registration
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.usersList.push(action.payload.user);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle User Update
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedUser = action.payload.user;
//         const userIndex = state.usersList.findIndex(
//           (user) => user._id === updatedUser._id
//         );
//         if (userIndex !== -1) {
//           state.usersList[userIndex] = updatedUser;
//         }
//         if (state.userInfo?._id === updatedUser._id) {
//           state.userInfo = updatedUser;
//           localStorage.setItem("user", JSON.stringify(updatedUser));
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload.user;
//       })
//       .addCase(getUserById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle Get All Users
//       .addCase(getAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.usersList = action.payload.users;
//         state.totalUsers = action.payload.userCount;
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getAllAdmins.pending, (state) => {
//         state.loadingAdmin = true;
//         state.error = null;
//       })
//       .addCase(getAllAdmins.fulfilled, (state, action) => {
//         state.loadingAdmin = false;
//         state.adminList = action.payload;
//       })
//       .addCase(getAllAdmins.rejected, (state, action) => {
//         state.loadingAdmin = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserCounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserCounts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userCounts = action.payload.count;
//       })
//       .addCase(getUserCounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.usersList = state.usersList.filter(
//           (item) => item._id !== action.payload.user._id
//         );
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserTrackedDates.pending, (state) => {
//         state.trackedDatesLoading = true;
//         state.trackedDatesError = null;
//       })
//       .addCase(getUserTrackedDates.fulfilled, (state, action) => {
//         state.trackedDatesLoading = false;
//         state.trackedDates = action.payload;
//       })
//       .addCase(getUserTrackedDates.rejected, (state, action) => {
//         state.trackedDatesLoading = false;
//         state.trackedDatesError = action.payload;
//       })

//       .addCase(getActiveUserLocations.pending, (state) => {
//         state.activeUserLocationsLoading = true;
//         state.activeUserLocationsError = null;
//       })
//       .addCase(getActiveUserLocations.fulfilled, (state, action) => {
//         state.activeUserLocationsLoading = false;
//         state.activeUserLocations = action.payload;
//       })
//       .addCase(getActiveUserLocations.rejected, (state, action) => {
//         state.activeUserLocationsLoading = false;
//         state.activeUserLocationsError = action.payload;
//       })

//       .addCase(getLastFiveTrackedUsers.pending, (state) => {
//         state.lastTrackedUsersLoading = true;
//         state.lastTrackedUsersError = null;
//       })
//       .addCase(getLastFiveTrackedUsers.fulfilled, (state, action) => {
//         state.lastTrackedUsersLoading = false;
//         state.lastTrackedUsers = action.payload;
//       })
//       .addCase(getLastFiveTrackedUsers.rejected, (state, action) => {
//         state.lastTrackedUsersLoading = false;
//         state.lastTrackedUsersError = action.payload;
//       })

//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle forgot password
//       .addCase(forgotPassword.pending, (state) => {
//         state.forgotPasswordLoading = true;
//         state.forgotPasswordError = null;
//         state.forgotPasswordSuccess = false;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.forgotPasswordLoading = false;
//         state.forgotPasswordSuccess = true;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.forgotPasswordLoading = false;
//         state.forgotPasswordError = action.payload?.message || "Failed to send OTP";
//       })

//       // Handle verify OTP
//       .addCase(verifyOtp.pending, (state) => {
//         state.verifyOtpLoading = true;
//         state.verifyOtpError = null;
//         state.verifyOtpSuccess = false;
//       })
//       .addCase(verifyOtp.fulfilled, (state, action) => {
//         state.verifyOtpLoading = false;
//         state.verifyOtpSuccess = true;
//         state.resetToken = action.payload.resetToken;
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.verifyOtpLoading = false;
//         state.verifyOtpError = action.payload?.message || "OTP verification failed";
//       })

//       // Handle forgot password reset
//       .addCase(forgotPasswordReset.pending, (state) => {
//         state.resetPasswordLoading = true;
//         state.resetPasswordError = null;
//         state.resetPasswordSuccess = false;
//       })
//       .addCase(forgotPasswordReset.fulfilled, (state, action) => {
//         state.resetPasswordLoading = false;
//         state.resetPasswordSuccess = true;
//       })
//       .addCase(forgotPasswordReset.rejected, (state, action) => {
//         state.resetPasswordLoading = false;
//         state.resetPasswordError = action.payload?.message || "Password reset failed";
//       });
//   },
// });

// export const { logoutUser, setUserInfo, clearResetStates } = userSlice.actions;
// export default userSlice.reducer;











// After Configuration

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// // Create axios instance with base URL
// const api = axios.create({
//   baseURL: BASE_URL,
// });

// // Add token to requests if it exists
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle User Registration
// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/register", payload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Handle User Update
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ userId, formData }, { rejectWithValue }) => {
//     try {
//       const response = await api.patch(
//         `/users/updateuser/${userId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );
// // Handle User Update
// // export const updateUser = createAsyncThunk(
// //   "user/updateUser",
// //   async ({ userId, formData }, { rejectWithValue, getState }) => {
// //     try {
// //       // Get the current auth state to access token and user info
// //       const state = getState();
// //       const token = state.auth?.token || localStorage.getItem("token");
// //       const userRole = state.auth?.user?.role_id || state.auth?.role_id;

// //       console.log("Updating user with role:", userRole);
// //       console.log("Token available:", !!token);

// //       // Ensure token is in the headers
// //       const config = {
// //         headers: { 
// //           "Content-Type": "multipart/form-data",
// //           "Authorization": token ? `Bearer ${token}` : undefined
// //         }
// //       };

// //       const response = await api.patch(
// //         `/users/updateuser/${userId}`,
// //         formData,
// //         config
// //       );

// //       toast.success(response.data.message);
// //       return response.data;
// //     } catch (error) {
// //       console.error("Update user error:", error.response?.data || error);

// //       // Handle specific error messages
// //       const errorMessage = error.response?.data?.message || "Failed to update user";

// //       // Check if it's a permission error
// //       if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
// //         toast.error("Permission denied. You need Super Admin rights to update configuration.");
// //       } else {
// //         toast.error(errorMessage);
// //       }

// //       return rejectWithValue(error.response?.data || { message: errorMessage });
// //     }
// //   }
// // );
// // Fetch All Users

// export const getAllUsers = createAsyncThunk(
//   "user/getAllUsers",
//   async (adminId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/users/alluser/${adminId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Fetch Single User by ID
// export const getUserById = createAsyncThunk(
//   "user/getUserById",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/users/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// // Delete User
// export const deleteUser = createAsyncThunk(
//   "user/deleteUser",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api.delete(`/users/deleteuser/${userId}`);
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const getUserCounts = createAsyncThunk(
//   "user/getUserCounts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/users/user-counts");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getAllAdmins = createAsyncThunk(
//   "user/getAllAdmins",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/users/alladmins");
//       return response.data?.admins;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const getUserTrack = createAsyncThunk(
//   "user/trackRecord",
//   async ({ id, date = "" }, { rejectWithValue }) => {
//     try {
//       const url = date
//         ? `/tracks/usertrack/${id}?date=${date}`
//         : `/tracks/usertrack/${id}`;

//       const response = await api.get(url);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Fetch all tracked dates for a user
// export const getUserTrackedDates = createAsyncThunk(
//   "user/getUserTrackedDates",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/tracks/user/${userId}/tracked-dates`);
//       return response.data.trackedDates;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getActiveUserLocations = createAsyncThunk(
//   "user/getActiveUserLocations",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/tracks/admin/active-user-locations");
//       return response.data.users;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to fetch locations");
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getLastFiveTrackedUsers = createAsyncThunk(
//   "user/getLastFiveTrackedUsers",
//   async (adminId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/tracks/last-five-tracked-users/${adminId}`);
//       return response.data.users;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // ✅ KEEP THIS ONE - for logged-in users changing password
// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async ({ oldPassword, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/reset-password", {
//         oldPassword,
//         newPassword,
//       });
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to reset password");
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );


// // ============ CONFIGURATION APIS ============

// // Get Configuration
// export const getConfig = createAsyncThunk(
//   "user/getConfig",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/users/getconfig");
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to fetch configuration");
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Create or Update Configuration
// export const createOrUpdateConfig = createAsyncThunk(
//   "user/createOrUpdateConfig",
//   async (configData, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/users/createorupdate", configData);
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       // Handle specific error messages
//       const errorMessage = error?.response?.data?.message || "Failed to save configuration";

//       // Check if it's a permission error
//       if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
//         toast.error("Permission denied. Only Super Admin can manage configuration.");
//       } else {
//         toast.error(errorMessage);
//       }

//       return rejectWithValue(error.response?.data || { message: errorMessage });
//     }
//   }
// );

// // Delete Configuration
// export const deleteConfig = createAsyncThunk(
//   "user/delete",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.delete("/users/delete");
//       toast.success(response.data.message);
//       return response.data;
//     } catch (error) {
//       const errorMessage = error?.response?.data?.message || "Failed to delete configuration";

//       // Check if it's a permission error
//       if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
//         toast.error("Permission denied. Only Super Admin can delete configuration.");
//       } else {
//         toast.error(errorMessage);
//       }

//       return rejectWithValue(error.response?.data || { message: errorMessage });
//     }
//   }
// );


// // User Slice
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     userInfo: JSON.parse(localStorage.getItem("user")) || {},
//     usersList: [],
//     totalUsers: null,
//     adminList: [],
//     userCounts: {},
//     userTrackInfo: [],
//     error: null,
//     trackedDates: [],
//     trackedDatesLoading: false,
//     trackedDatesError: null,
//     activeUserLocations: [],
//     activeUserLocationsLoading: false,
//     activeUserLocationsError: null,
//     lastTrackedUsers: [],
//     lastTrackedUsersLoading: false,
//     lastTrackedUsersError: null,
//   },
//   reducers: {
//     logoutUser: (state) => {
//       state.userInfo = {};
//       state.usersList = [];
//       state.adminList = [];
//       state.userTrackInfo = [];
//       state.userCounts = {};
//       state.error = null;
//       state.loading = false;
//       // Don't remove localStorage here - authSlice handles that
//     },
//     setUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     // Add these new config-related states
//     config: null,
//     configLoading: false,
//     configError: null,
//     configUpdateLoading: false,
//     configUpdateError: null,
//     configDeleteLoading: false,
//     configDeleteError: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       // ❌ REMOVED loginUser - use authSlice instead

//       // Handle Registration
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.usersList.push(action.payload.user);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle User Update
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedUser = action.payload.user;
//         const userIndex = state.usersList.findIndex(
//           (user) => user._id === updatedUser._id
//         );
//         if (userIndex !== -1) {
//           state.usersList[userIndex] = updatedUser;
//         }
//         if (state.userInfo?._id === updatedUser._id) {
//           state.userInfo = updatedUser;
//           localStorage.setItem("user", JSON.stringify(updatedUser));
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload.user;
//       })
//       .addCase(getUserById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle Get All Users
//       .addCase(getAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.usersList = action.payload.users;
//         state.totalUsers = action.payload.userCount;
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getAllAdmins.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllAdmins.fulfilled, (state, action) => {
//         state.loading = false;
//         state.adminList = action.payload;
//       })
//       .addCase(getAllAdmins.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserCounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserCounts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userCounts = action.payload.count;
//       })
//       .addCase(getUserCounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.usersList = state.usersList.filter(
//           (item) => item._id !== action.payload.user._id
//         );
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserTrack.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserTrack.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userTrackInfo = action.payload?.user;
//       })
//       .addCase(getUserTrack.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getUserTrackedDates.pending, (state) => {
//         state.trackedDatesLoading = true;
//         state.trackedDatesError = null;
//       })
//       .addCase(getUserTrackedDates.fulfilled, (state, action) => {
//         state.trackedDatesLoading = false;
//         state.trackedDates = action.payload;
//       })
//       .addCase(getUserTrackedDates.rejected, (state, action) => {
//         state.trackedDatesLoading = false;
//         state.trackedDatesError = action.payload;
//       })

//       .addCase(getActiveUserLocations.pending, (state) => {
//         state.activeUserLocationsLoading = true;
//         state.activeUserLocationsError = null;
//       })
//       .addCase(getActiveUserLocations.fulfilled, (state, action) => {
//         state.activeUserLocationsLoading = false;
//         state.activeUserLocations = action.payload;
//       })
//       .addCase(getActiveUserLocations.rejected, (state, action) => {
//         state.activeUserLocationsLoading = false;
//         state.activeUserLocationsError = action.payload;
//       })

//       .addCase(getLastFiveTrackedUsers.pending, (state) => {
//         state.lastTrackedUsersLoading = true;
//         state.lastTrackedUsersError = null;
//       })
//       .addCase(getLastFiveTrackedUsers.fulfilled, (state, action) => {
//         state.lastTrackedUsersLoading = false;
//         state.lastTrackedUsers = action.payload;
//       })
//       .addCase(getLastFiveTrackedUsers.rejected, (state, action) => {
//         state.lastTrackedUsersLoading = false;
//         state.lastTrackedUsersError = action.payload;
//       })

//       // ✅ KEEP THIS ONE - for logged-in users changing password
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // ============ CONFIGURATION CASES ============

//       // Get Config
//       .addCase(getConfig.pending, (state) => {
//         state.configLoading = true;
//         state.configError = null;
//       })
//       .addCase(getConfig.fulfilled, (state, action) => {
//         state.configLoading = false;
//         state.config = action.payload.data;
//       })
//       .addCase(getConfig.rejected, (state, action) => {
//         state.configLoading = false;
//         state.configError = action.payload?.message || "Failed to fetch configuration";
//       })

//       // Create or Update Config
//       .addCase(createOrUpdateConfig.pending, (state) => {
//         state.configUpdateLoading = true;
//         state.configUpdateError = null;
//       })
//       .addCase(createOrUpdateConfig.fulfilled, (state, action) => {
//         state.configUpdateLoading = false;
//         state.config = action.payload.data; // Update the config in state with the response
//       })
//       .addCase(createOrUpdateConfig.rejected, (state, action) => {
//         state.configUpdateLoading = false;
//         state.configUpdateError = action.payload?.message || "Failed to save configuration";
//       })

//       // Delete Config
//       .addCase(deleteConfig.pending, (state) => {
//         state.configDeleteLoading = true;
//         state.configDeleteError = null;
//       })
//       .addCase(deleteConfig.fulfilled, (state) => {
//         state.configDeleteLoading = false;
//         state.config = null; // Clear config from state after deletion
//       })
//       .addCase(deleteConfig.rejected, (state, action) => {
//         state.configDeleteLoading = false;
//         state.configDeleteError = action.payload?.message || "Failed to delete configuration";
//       });
//   },
// });

// export const { logoutUser, setUserInfo } = userSlice.actions;
// export default userSlice.reducer;



























//With Configuration

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

// Handle User Registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Handle User Update
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/users/updateuser/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch All Users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/alluser/${adminId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch Single User by ID
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/deleteuser/${userId}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUserCounts = createAsyncThunk(
  "user/getUserCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/user-counts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "user/getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/alladmins");
      return response.data?.admins;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUserTrack = createAsyncThunk(
  "user/trackRecord",
  async ({ id, date = "" }, { rejectWithValue }) => {
    try {
      const url = date
        ? `/tracks/usertrack/${id}?date=${date}`
        : `/tracks/usertrack/${id}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all tracked dates for a user
export const getUserTrackedDates = createAsyncThunk(
  "user/getUserTrackedDates",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tracks/user/${userId}/tracked-dates`);
      return response.data.trackedDates;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getActiveUserLocations = createAsyncThunk(
  "user/getActiveUserLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/tracks/admin/active-user-locations");
      return response.data.users;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch locations");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLastFiveTrackedUsers = createAsyncThunk(
  "user/getLastFiveTrackedUsers",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tracks/last-five-tracked-users/${adminId}`);
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ✅ KEEP THIS ONE - for logged-in users changing password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/reset-password", {
        oldPassword,
        newPassword,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ============ CONFIGURATION APIS ============

// Get Configuration
export const getConfig = createAsyncThunk(
  "user/getConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/getconfig");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch configuration");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create or Update Configuration
export const createOrUpdateConfig = createAsyncThunk(
  "user/createOrUpdateConfig",
  async (configData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/createorupdate", configData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      // Handle specific error messages
      const errorMessage = error?.response?.data?.message || "Failed to save configuration";

      // Check if it's a permission error
      if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
        toast.error("Permission denied. Only Super Admin can manage configuration.");
      } else {
        toast.error(errorMessage);
      }

      return rejectWithValue(error.response?.data || { message: errorMessage });
    }
  }
);

// Delete Configuration
export const deleteConfig = createAsyncThunk(
  "user/deleteConfig", // Fixed: Changed from "user/delete" to "user/deleteConfig"
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/users/delete");
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to delete configuration";

      // Check if it's a permission error
      if (error.response?.status === 403 || errorMessage.includes("Access denied")) {
        toast.error("Permission denied. Only Super Admin can delete configuration.");
      } else {
        toast.error(errorMessage);
      }

      return rejectWithValue(error.response?.data || { message: errorMessage });
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: JSON.parse(localStorage.getItem("user")) || {},
    usersList: [],
    totalUsers: null,
    adminList: [],
    userCounts: {},
    userTrackInfo: [],
    error: null,
    trackedDates: [],
    trackedDatesLoading: false,
    trackedDatesError: null,
    activeUserLocations: [],
    activeUserLocationsLoading: false,
    activeUserLocationsError: null,
    lastTrackedUsers: [],
    lastTrackedUsersLoading: false,
    lastTrackedUsersError: null,
    // ✅ FIXED: Config states properly placed in initialState
    config: null,
    configLoading: false,
    configError: null,
    configUpdateLoading: false,
    configUpdateError: null,
    configDeleteLoading: false,
    configDeleteError: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = {};
      state.usersList = [];
      state.adminList = [];
      state.userTrackInfo = [];
      state.userCounts = {};
      state.error = null;
      state.loading = false;
      // Reset config states on logout
      state.config = null;
      state.configLoading = false;
      state.configError = null;
      state.configUpdateLoading = false;
      state.configUpdateError = null;
      state.configDeleteLoading = false;
      state.configDeleteError = null;
      // Don't remove localStorage here - authSlice handles that
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // ❌ REMOVED loginUser - use authSlice instead

      // Handle Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList.push(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle User Update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.user;
        const userIndex = state.usersList.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex !== -1) {
          state.usersList[userIndex] = updatedUser;
        }
        if (state.userInfo?._id === updatedUser._id) {
          state.userInfo = updatedUser;
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload.users;
        state.totalUsers = action.payload.userCount;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.adminList = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.userCounts = action.payload.count;
      })
      .addCase(getUserCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = state.usersList.filter(
          (item) => item._id !== action.payload.user._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTrack.fulfilled, (state, action) => {
        state.loading = false;
        state.userTrackInfo = action.payload?.user;
      })
      .addCase(getUserTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserTrackedDates.pending, (state) => {
        state.trackedDatesLoading = true;
        state.trackedDatesError = null;
      })
      .addCase(getUserTrackedDates.fulfilled, (state, action) => {
        state.trackedDatesLoading = false;
        state.trackedDates = action.payload;
      })
      .addCase(getUserTrackedDates.rejected, (state, action) => {
        state.trackedDatesLoading = false;
        state.trackedDatesError = action.payload;
      })

      .addCase(getActiveUserLocations.pending, (state) => {
        state.activeUserLocationsLoading = true;
        state.activeUserLocationsError = null;
      })
      .addCase(getActiveUserLocations.fulfilled, (state, action) => {
        state.activeUserLocationsLoading = false;
        state.activeUserLocations = action.payload;
      })
      .addCase(getActiveUserLocations.rejected, (state, action) => {
        state.activeUserLocationsLoading = false;
        state.activeUserLocationsError = action.payload;
      })

      .addCase(getLastFiveTrackedUsers.pending, (state) => {
        state.lastTrackedUsersLoading = true;
        state.lastTrackedUsersError = null;
      })
      .addCase(getLastFiveTrackedUsers.fulfilled, (state, action) => {
        state.lastTrackedUsersLoading = false;
        state.lastTrackedUsers = action.payload;
      })
      .addCase(getLastFiveTrackedUsers.rejected, (state, action) => {
        state.lastTrackedUsersLoading = false;
        state.lastTrackedUsersError = action.payload;
      })

      // ✅ KEEP THIS ONE - for logged-in users changing password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ============ CONFIGURATION CASES ============

      // Get Config
      .addCase(getConfig.pending, (state) => {
        state.configLoading = true;
        state.configError = null;
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        state.configLoading = false;
        state.config = action.payload.data;
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = action.payload?.message || "Failed to fetch configuration";
      })

      // Create or Update Config
      .addCase(createOrUpdateConfig.pending, (state) => {
        state.configUpdateLoading = true;
        state.configUpdateError = null;
      })
      .addCase(createOrUpdateConfig.fulfilled, (state, action) => {
        state.configUpdateLoading = false;
        state.config = action.payload.data; // Update the config in state with the response
      })
      .addCase(createOrUpdateConfig.rejected, (state, action) => {
        state.configUpdateLoading = false;
        state.configUpdateError = action.payload?.message || "Failed to save configuration";
      })

      // Delete Config
      .addCase(deleteConfig.pending, (state) => {
        state.configDeleteLoading = true;
        state.configDeleteError = null;
      })
      .addCase(deleteConfig.fulfilled, (state) => {
        state.configDeleteLoading = false;
        state.config = null; // Clear config from state after deletion
      })
      .addCase(deleteConfig.rejected, (state, action) => {
        state.configDeleteLoading = false;
        state.configDeleteError = action.payload?.message || "Failed to delete configuration";
      });
  },
});

export const { logoutUser, setUserInfo } = userSlice.actions;
export default userSlice.reducer;