import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const response = await axios.get('/api/products')
    return [...response.data.data]
}
)

const initialState = {
    loading: false,
    products: [],
    error: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default productsSlice.reducer