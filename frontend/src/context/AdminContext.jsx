import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { AUTH_ENDPOINTS } from '../constants/api';

const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdminDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN_DETAILS);
            setAdmin(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch admin details');
            // If unauthorized, clear admin data
            if (err.response?.status === 401) {
                setAdmin(null);
                localStorage.removeItem('adminToken');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.post(AUTH_ENDPOINTS.ADMIN_LOGIN, credentials);
            localStorage.setItem('adminToken', response.data.token);
            await fetchAdminDetails();
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    // Fetch admin details on mount and when token changes
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            fetchAdminDetails();
        } else {
            setLoading(false);
        }
    }, []);

    const value = {
        admin,
        loading,
        error,
        login,
        logout,
        fetchAdminDetails
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext; 