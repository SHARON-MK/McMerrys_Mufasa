import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { ADMIN_ENDPOINTS } from '../../constants/api';

// Async thunks
export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(ADMIN_ENDPOINTS.BOOKINGS);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch a single booking by ID
export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${ADMIN_ENDPOINTS. BOOKING_BY_ID(bookingId)}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const confirmBooking = createAsyncThunk(
    'bookings/confirmBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                ADMIN_ENDPOINTS.CONFIRM_BOOKING(bookingId),
                {}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(ADMIN_ENDPOINTS.DELETE_BOOKING_BY_ID(bookingId));
            return bookingId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        items: [],
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
            // Fetch Bookings
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch bookings';
            })
            // Confirm Booking
            .addCase(confirmBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(confirmBooking.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(booking => booking._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(confirmBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to confirm booking';
            })
            // Delete Booking
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(booking => booking._id !== action.payload);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete booking';
            });
    }
});

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer; 