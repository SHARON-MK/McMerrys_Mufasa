import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { ADMIN_ENDPOINTS } from '../../constants/api';

// Async thunks
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(ADMIN_ENDPOINTS.CATEGORIES);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(ADMIN_ENDPOINTS.CATEGORIES, categoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ categoryId, categoryData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                ADMIN_ENDPOINTS.CATEGORY_BY_ID(categoryId),
                categoryData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(ADMIN_ENDPOINTS.CATEGORY_BY_ID(categoryId));
            return categoryId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
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
            // Fetch Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch categories';
            })
            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create category';
            })
            // Update Category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update category';
            })
            // Delete Category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(category => category._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete category';
            });
    }
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer; 