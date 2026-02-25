// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// App Configuration
export const APP_NAME = 'Team Trackify';
export const APP_VERSION = '1.0.0';

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

