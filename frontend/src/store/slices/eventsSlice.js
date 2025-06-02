import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PUBLIC_ENDPOINTS } from '../../constants/api';
import axiosInstance from '../../utils/axios';
import axios from 'axios';

// Async thunks
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${PUBLIC_ENDPOINTS.EVENTS}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
        }
    }
);

export const createEvent = createAsyncThunk(
    'events/createEvent',
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${PUBLIC_ENDPOINTS}/events`, eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create event');
        }
    }
);

export const updateEvent = createAsyncThunk(
    'events/updateEvent',
    async ({ eventId, eventData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`${PUBLIC_ENDPOINTS}/events/${eventId}`, eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update event');
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (eventId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${PUBLIC_ENDPOINTS}/events/${eventId}`);
            return eventId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
        }
    }
);

export const fetchEventById = createAsyncThunk(
    'events/fetchEventById',
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${PUBLIC_ENDPOINTS.EVENT_BY_ID(eventId)}`);
         
            return response.data;
           
            
``        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch event details');
        }
    }
);

export const createBooking = createAsyncThunk(
    'events/createBooking',
    async ({ eventId, bookingData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${PUBLIC_ENDPOINTS}/events/${eventId}/book`, bookingData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
        }
    }
);

const initialState = {
    items: [],
    selectedEvent: null,
    loading: false,
    error: null,
    bookingSuccess: false,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearBookingSuccess: (state) => {
            state.bookingSuccess = false;
        },
        clearSelectedEvent: (state) => {
            state.selectedEvent = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Events
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Event
            .addCase(createEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Event
            .addCase(updateEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(event => event._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Event
            .addCase(deleteEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(event => event._id !== action.payload);
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Event by ID
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedEvent = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Booking
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.bookingSuccess = false;
            })
            .addCase(createBooking.fulfilled, (state) => {
                state.loading = false;
                state.bookingSuccess = true;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.bookingSuccess = false;
            });
    },
});

export const { clearError, clearBookingSuccess, clearSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer; 