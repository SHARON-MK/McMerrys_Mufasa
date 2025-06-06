// API Base URL
// export const API_BASE_URL = 'http://localhost:5000/api';

export const API_BASE_URL ="https://mc-merrys-mufasa-ibhe.vercel.app/api"

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
    DELETE_BOOKING_BY_ID: (id) => `${API_BASE_URL}/admin/bookings/${id}`,
    FETCH_EMAIL_DATA: `${API_BASE_URL}/admin/email-data`,

    CREATE_AD :`${API_BASE_URL}/admin/create-ad`,
      DELETE: (id) => `${API_BASE_URL}/admin/advertisements/${id}`,
         UPDATE: (id) => `${API_BASE_URL}/admin/advertisements/${id}`,
           LIST:   `${API_BASE_URL}/admin/advertisements`,

 
};

// Public Endpoints
export const PUBLIC_ENDPOINTS = {
    EVENTS: `${API_BASE_URL}/user/events`,
    EVENT_BY_ID: (id) => `${API_BASE_URL}/user/events/${id}`,
    CATEGORIES: `${API_BASE_URL}/categories`,
    CATEGORY_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,
    BOOKING: (id)=>`${API_BASE_URL}/user/create-booking/${id}`,
    EMAIL_SUBMISSION: `${API_BASE_URL}/user/send-mail`,
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