import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { savePhotoToDatabase } from './productsSlice';

const initialState = {
    // uploaded state
    uploadImgLoading: false,
    uploadImgError: null,
    uploadedImage: {},
    uploadedSuccess: false,
    // delete state
    deleteImgLoading: false,
    deleteImgError: null,
    deletedImage: {},
    deletedImageSuccess: false
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
export const deletePhoto = createAsyncThunk('deletePhoto', async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        let publicId = { public_id: payload.public_id };
        const { data } = await axios.post("/api/image/delete", publicId, config);
        if (data.result === 'ok') {
            dispatch(savePhotoToDatabase(payload._id))
        }
        // return data;
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
                state.uploadedSuccess = true
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
                state.deletedImageSuccess = true
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.deleteImgLoading = false;
                state.deleteImgError = action.payload
            })
    }
})

// export const { } = imageSlice.actions
export default imageSlice.reducer