import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    // uploaded state
    uploadImgLoading: false,
    uploadImgError: null,
    uploadedImage: {},
    // delete state
    deleteImgLoading: false,
    deleteImgError: null,
    deletedImage: {}
}

// Upload Image Thunk
export const uploadPhoto = createAsyncThunk('uploadPhoto', async ({ formData }, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post("/api/image/upload", formData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

// Delete Image Thunk
export const deletePhoto = createAsyncThunk('deletePhoto', async (publicId, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post("/api/image/delete", publicId, config);
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Upload Photo
            .addCase(uploadPhoto.pending, (state, action) => {
                state.uploadImgLoading = true
            })
            .addCase(uploadPhoto.fulfilled, (state, action) => {
                state.uploadImgLoading = false
                state.uploadedImage = action.payload
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.uploadImgLoading = false;
                state.uploadImgError = action.payload
            })
            // Delete Photo
            .addCase(deletePhoto.pending, (state, action) => {
                state.deleteImgLoading = true
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.deleteImgLoading = false
                state.deletedImage = action.payload
                state.uploadedImage = {}
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.deleteImgLoading = false;
                state.deleteImgError = action.payload
            })
    }
})

// export const { } = imageSlice.actions
export default imageSlice.reducer