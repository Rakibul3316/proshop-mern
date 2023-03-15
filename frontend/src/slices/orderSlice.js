import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    order: {},
    success: false,
    myOrders: [],
    // Order payment
    paymentLoading: false,
    paymentError: null,
    paymentSuccess: false,
    // Gettings all orders
    allOrdersLoading: false,
    allOrders: [],
    allOrdersError: null,
    allOrdersSuccess: false,
    // Delivered order
    deliverLoading: false,
    deliverError: null,
    deliverSuccess: false,
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
export const getOrderDetails = createAsyncThunk('getOrderDetails', async (id, { getState, rejectWithValue }) => {
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

export const payOrder = createAsyncThunk('payOrder', async (orderId, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, {}, config);
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

export const deliverOrder = createAsyncThunk('deliverOrder', async (orderId, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {}, config);
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

export const getOrders = createAsyncThunk('getOrders', async (_, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/orders`, config);
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
    reducers: {
        resetCreateOrder: (state, action) => {
            state.loading = false
            state.error = null
            state.success = false
        },
        resetPaymentOrder: (state, action) => {
            state.paymentLoading = false;
            state.paymentError = null;
            state.paymentSuccess = false;
        },
        resetDeliverOrder: (state, action) => {
            state.deliverLoading = false;
            state.deliverError = null;
            state.deliverSuccess = false;
        }
    },
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
                state.paymentLoading = true;
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.paymentLoading = false;
                state.paymentSuccess = true;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.paymentLoading = false;
                state.paymentError = action.payload
            })
            // Deliver functionality
            .addCase(deliverOrder.pending, (state, action) => {
                state.deliverLoading = true;
            })
            .addCase(deliverOrder.fulfilled, (state, action) => {
                state.deliverLoading = false;
                state.deliverSuccess = true;
            })
            .addCase(deliverOrder.rejected, (state, action) => {
                state.deliverLoading = false;
                state.deliverError = action.payload
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
            // Getting all orders
            .addCase(getOrders.pending, (state, action) => {
                state.allOrdersLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.allOrdersLoading = false;
                state.allOrders = action.payload;
                state.allOrdersSuccess = true
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.allOrdersLoading = false;
                state.allOrdersError = action.payload
            })
    }
})

export const { resetPaymentOrder, resetDeliverOrder, resetCreateOrder } = orderSlice.actions
export default orderSlice.reducer