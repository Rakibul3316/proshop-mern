import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchProduct = createAsyncThunk('fetchProduct', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/products/${id}`)
        return { ...response.data.data }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

const initialState = {
    loading: false,
    product: {
        reviews: []
    },
    error: null
}

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: initialState,
    reducers: {
        resetProduct: (state, action) => {
            state.loading = false
            state.product = {
                reviews: []
            }
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state, action) => {
                state.loading = true;
                state.product = { ...state };
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export const { resetProduct } = productDetailsSlice.actions
export default productDetailsSlice.reducer