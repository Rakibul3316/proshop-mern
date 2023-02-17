import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    success: false,
    products: [],
    // For createProduct thunk
    createLoading: false,
    createError: null,
    createSuccess: false,
}

// First, create the thunk
export const fetchProducts = createAsyncThunk('fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/products')
        return [...response.data.data]
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async ({ id }, { rejectWithValue, getState }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.delete(`/api/products/${id}`, config)
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const createProduct = createAsyncThunk('createProduct', async (product, { rejectWithValue, getState }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/products`, product, config)
        resetCreateProduct();
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        resetCreateProduct: (state, action) => {
            state.createLoading = false;
            state.createError = null;
            state.createSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.success = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Delete product
            .addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Create product
            .addCase(createProduct.pending, (state, action) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createLoading = false;
                state.createSuccess = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload
            })
    }
})

export const { resetCreateProduct } = productsSlice.actions
export default productsSlice.reducer