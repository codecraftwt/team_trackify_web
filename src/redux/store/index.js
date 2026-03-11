import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import planReducer from '../slices/planSlice';
import paymentReducer from '../slices/paymentSlice';
import reportReducer from '../slices/reportSlice';
import contactReducer from '../slices/contactSlice';
import couponSliceReducer from '../slices/couponSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    plan: planReducer,
    payment: paymentReducer,
    report: reportReducer,
    contact: contactReducer,
    coupon: couponSliceReducer,
  },
});

export default store;