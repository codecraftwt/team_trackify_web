// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://trackingapp-backend-6ny6.onrender.com/api/';

// App Configuration
export const APP_NAME = 'Team Trackify';
export const APP_VERSION = '1.0.0';

// export const baseURL = 'https://tracking.walstartechnologies.com/';
export const API_KEY = "UEnJxClxfXyy2HYh_p9AdtvUUYDR0";

// export const baseURL = "http://localhost:5000/";
export const baseURL = "https://trackingapp-backend-6ny6.onrender.com/api/";

// export const baseURL = "https://trackingapp-backend-1.onrender.com/";

// export const baseURL = "https://trackingapp.instantwebsitedevelopment.com/";

// Razorpay Configuration
// export const RAZORPAY_KEY_ID = "rzp_live_0fMe7hBqXJktWH";
export const RAZORPAY_KEY_ID = "rzp_test_SN1JoYwhNqRjPV";




// export const baseURL = import.meta.env.VITE_BASE_URL;
// export const API_KEY = import.meta.env.VITE_API_KEY;
// export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 1,
  ORGANIZATION_ADMIN: 2,
  USER: 3,
};

