import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { AUTH_ENDPOINTS } from '../../constants/api';

// Async thunks
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(AUTH_ENDPOINTS.ADMIN_LOGIN, credentials);
            localStorage.setItem('adminToken', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('adminToken');
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('adminToken'),
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 