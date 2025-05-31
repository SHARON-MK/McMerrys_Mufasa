import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { ADMIN_ENDPOINTS } from '../../constants/api';

// Async thunks
export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(ADMIN_ENDPOINTS.EVENTS);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createEvent = createAsyncThunk(
    'events/createEvent',
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(ADMIN_ENDPOINTS.EVENTS, eventData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (eventId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(ADMIN_ENDPOINTS.EVENT_BY_ID(eventId));
            return eventId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
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
                state.error = action.payload?.message || 'Failed to fetch events';
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
                state.error = action.payload?.message || 'Failed to create event';
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
                state.error = action.payload?.message || 'Failed to delete event';
            });
    }
});

export const { clearError } = eventsSlice.actions;
export default eventsSlice.reducer; 