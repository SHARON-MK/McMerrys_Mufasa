import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import categoriesReducer from './slices/categoriesSlice';
import bookingsReducer from './slices/bookingsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        categories: categoriesReducer,
        bookings: bookingsReducer,
        auth: authReducer
    }
});