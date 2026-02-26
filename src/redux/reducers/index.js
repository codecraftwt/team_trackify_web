import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import planReducer from '../slices/planSlice';
import paymentReducer from '../slices/paymentSlice';
import reportReducer from '../slices/reportSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  plan: planReducer,
  payment: paymentReducer,
  report: reportReducer,
});

export default rootReducer;