// API Base URL
export const API_BASE_URL = 'http://localhost:5000/api';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
    ADMIN_LOGIN: `${API_BASE_URL}/auth/admin/login`,
};

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
    EVENTS: `${API_BASE_URL}/admin/events`,
    EVENT_BY_ID: (id) => `${API_BASE_URL}/admin/events/${id}`,
    CATEGORIES: `${API_BASE_URL}/admin/categories`,
    CATEGORY_BY_ID: (id) => `${API_BASE_URL}/admin/categories/${id}`,
    BOOKINGS: `${API_BASE_URL}/admin/bookings`,
    BOOKING_BY_ID: (id) => `${API_BASE_URL}/admin/bookings/${id}`,
    CONFIRM_BOOKING: (id) => `${API_BASE_URL}/admin/bookings/${id}/confirm`,
};

// Public Endpoints
export const PUBLIC_ENDPOINTS = {
    EVENTS: `${API_BASE_URL}/events`,
    EVENT_BY_ID: (id) => `${API_BASE_URL}/events/${id}`,
    CATEGORIES: `${API_BASE_URL}/categories`,
    CATEGORY_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,
    BOOKINGS: `${API_BASE_URL}/bookings`,
};

// API Headers
export const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}; 