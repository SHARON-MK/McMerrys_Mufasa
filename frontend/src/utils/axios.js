import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('adminToken');
        
        // If token exists, add it to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }

        // Handle other errors
        const errorMessage = error.response?.data?.message || 'An error occurred';
        console.error('API Error:', errorMessage);

        return Promise.reject(error);
    }
);

export default axiosInstance; 