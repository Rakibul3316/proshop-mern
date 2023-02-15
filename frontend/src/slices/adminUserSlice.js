import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial State
const initialState = {
    loading: false,
    success: false,
    error: null,
    // All users in the system.
    users: [],
    // specific user details
    user: {},
    updateLoading: false,
    updateSuccess: false,
    updateError: null,
}

// Actions for admin
export const userList = createAsyncThunk('userList', async (_, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get('/api/users', config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const userDetails = createAsyncThunk('userDetails', async ({ id }, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})


export const userDelete = createAsyncThunk('userDelete', async ({ id }, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.delete(`/api/users/${id}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const userUpdate = createAsyncThunk('userUpdate', async ({ user }, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(`/api/users/${user._id}`, user, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

// Reducers
export const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState: initialState,
    reducers: {
        resetUserDetails: (state, action) => {
            state.updateLoading = false;
            state.updateSuccess = false;
            state.updateError = null;
            state.user = {};
        }
    },
    extraReducers: (builder) => {
        builder
            // user lists for admin
            .addCase(userList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(userList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // user details for admin
            .addCase(userDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // delete user by admin
            .addCase(userDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(userDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // update user by admin
            .addCase(userUpdate.pending, (state, action) => {
                state.updateLoading = true
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateSuccess = true;
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            })
    }
})

export const { resetUserDetails } = adminUserSlice.actions
export default adminUserSlice.reducer