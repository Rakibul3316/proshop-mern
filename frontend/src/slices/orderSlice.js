import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    error: null,
    order: {},
    success: false,
    myOrders: []
}

// Actions
export const createOrder = createAsyncThunk('createOrder', async (order, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post('/api/orders', order, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

// Actions
export const getOrderDetails = createAsyncThunk('getOrderDetails', async (id, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

export const payOrder = createAsyncThunk('payOrder', async ({ orderId, paymentResult }, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

export const getMyOrders = createAsyncThunk('getMyOrders', async (_, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)


export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.success = true
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Get Order Details
            .addCase(getOrderDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Payment functionality
            .addCase(payOrder.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Logged in user orders
            .addCase(getMyOrders.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.myOrders = action.payload;
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

// export const { } = orderSlice.actions
export default orderSlice.reducer