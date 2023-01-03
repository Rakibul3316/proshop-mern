import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk('addToCart', async ({ id, qty }, { getState, rejectWithValue, dispatch }) => {
    try {
        const response = await axios.get(`/api/products/${id}`)
        let data = { ...response.data.data };
        data.qty = qty

        dispatch(cartAddItem({ data }))
        // Store cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

// Set cart item data from local storage
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cartItems: cartItemsFromLocalStorage,
    error: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        cartAddItem: (state, action) => {
            const item = action.payload.data
            const existItem = state.cartItems.find(i => i._id === item._id)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i._id === item._id ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { cartAddItem } = cartSlice.actions
export default cartSlice.reducer