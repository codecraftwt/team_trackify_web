/**
 * Format date to YYYY-MM-DD (for API requests, database queries)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate days remaining until a plan expires
 * @param {string} expiresAt - Expiry date string
 * @returns {number} Days left (negative if expired)
 */
export const planExpiresIn = (expiresAt) => {
  const currentDate = new Date();
  const expirationDate = new Date(expiresAt);
  const timeDiff = expirationDate - currentDate;
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

/**
 * Format date to DD-MM-YYYY (Indian format)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDateDDMMYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Format date to MM/DD/YYYY (US format)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDateMMDDYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Format date to YYYY/MM/DD (ISO-like format)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDateYYYYMMDD = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

/**
 * Format date and time to DD-MM-YYYY, HH:MM AM/PM
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date and time string
 */
export const formatDateTimeDDMMYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return `${day}-${month}-${year}, ${formattedTime}`;
};

/**
 * Format date and time to MM/DD/YYYY, HH:MM AM/PM (US format)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date and time string
 */
export const formatDateTimeMMDDYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return `${month}/${day}/${year}, ${formattedTime}`;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Format date to relative time (e.g., "2 minutes ago", "yesterday")
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateInput) => {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 30) {
    return formatDateDDMMYYYY(date);
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? "yesterday" : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
  } else {
    return "just now";
  }
};

/**
 * Format time to HH:MM AM/PM
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted time string
 */
export const formatTime = (dateInput) => {
  const date = new Date(dateInput);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

/**
 * Check if a date is today
 * @param {string|Date} dateInput - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (dateInput) => {
  const date = new Date(dateInput);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is in the past
 * @param {string|Date} dateInput - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (dateInput) => {
  const date = new Date(dateInput);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if a date is in the future
 * @param {string|Date} dateInput - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (dateInput) => {
  const date = new Date(dateInput);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date > today;
};

/**
 * Get the number of days between two dates
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @returns {number} Number of days difference
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Add days to a date
 * @param {string|Date} dateInput - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (dateInput, days) => {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Format date range as string
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "";
  return `${formatDateDDMMYYYY(startDate)} - ${formatDateDDMMYYYY(endDate)}`;
};