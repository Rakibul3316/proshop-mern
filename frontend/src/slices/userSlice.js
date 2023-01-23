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
        localStorage.setItem('userInfo', JSON.stringify(getState().user.userInfo))
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

export const register = createAsyncThunk('register', async ({ name, email, password }, { getState, rejectWithValue, dispatch }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config);
        dispatch(addUserInfo(data))
        localStorage.setItem('userInfo', JSON.stringify(getState().user.userInfo))
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
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    loading: false,
    userInfo: userInfoFromLocalStorage,
    error: null
}

export const userSlice = createSlice({
    name: 'userLogin',
    initialState: initialState,
    reducers: {
        addUserInfo: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = null;
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export const { addUserInfo } = userSlice.actions
export default userSlice.reducer