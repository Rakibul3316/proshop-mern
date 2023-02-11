import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Actions
export const login = createAsyncThunk('login', async ({ email, password }, { getState, rejectWithValue, dispatch }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config);
        dispatch(addUserInfo(data))
        localStorage.setItem('userInfo', JSON.stringify(getState().userLogIn.userInfo))
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

export const register = createAsyncThunk('register', async ({ name, email, password }, { getState, rejectWithValue, dispatch }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config);
        dispatch(addUserInfo(data))
        localStorage.setItem('userInfo', JSON.stringify(getState().userLogIn.userInfo))
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
)

export const updateUserDetails = createAsyncThunk('updateUserDetails', async ({ id, name, email, password }, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put('/api/users/profile/update', { id, name, email, password }, config);
        dispatch(updateUserInfo(data))
        getState().userLogIn.userInfo = { ...data };
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

export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
    try {
        localStorage.removeItem('userInfo')
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

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

// Set cart item data from local storage
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    loading: false,
    userInfo: userInfoFromLocalStorage,
    error: null,
    success: false,
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUserInfo: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null
        },
        updateUserInfo: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null;
            state.success = true;
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // logout
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = null;
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // register
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // user lists
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
    }
})

export const { addUserInfo, updateUserInfo } = userSlice.actions
export default userSlice.reducer