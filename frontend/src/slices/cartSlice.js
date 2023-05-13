import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Actions
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

export const removeFromCart = createAsyncThunk('removeFromCart', async (id, { getState, dispatch }) => {
    dispatch(cartRemoveItem(id))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
})

export const saveShippingData = createAsyncThunk('saveShippingData', async ({ address, city, postalCode, country, }, { getState, dispatch }) => {
    let data = {
        address,
        city,
        postalCode,
        country,
    }
    dispatch(saveShippingAddress(data))
    localStorage.setItem('shippingAddress', JSON.stringify(data))
})

export const savePaymentMethod = createAsyncThunk('savePaymentMethod', async ({ method }, { getState, dispatch }) => {
    dispatch(paymentMethod(method))
    localStorage.setItem('paymentMethod', JSON.stringify(method))
})

// Set cart item data from local storage
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// Set shipping address data from local storage
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cartItems: cartItemsFromLocalStorage,
    error: null,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: ''
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
        },
        cartRemoveItem: (state, action) => {
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i._id !== action.payload)
            }
        },
        saveShippingAddress: (state, action) => {
            return {
                ...state,
                shippingAddress: action.payload
            }
        },
        paymentMethod: (state, action) => {
            return {
                ...state,
                paymentMethod: action.payload
            }
        },
        resetCart: (state, action) => {
            state.cartItems = []
            state.shippingAddress = {}
            state.paymentMethod = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { cartAddItem, cartRemoveItem, saveShippingAddress, paymentMethod, resetCart } = cartSlice.actions
export default cartSlice.reducer