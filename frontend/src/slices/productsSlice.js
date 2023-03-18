import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    success: false,
    products: [],
    // For createProduct thunk
    createLoading: false,
    createError: null,
    createSuccess: false,
    // For update product thunk
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
    // Delete image and update product_image object
    deleteProductImgLoading: false,
    deleteProductImgError: null,
    deleteProductImgSuccess: false,
    // Save image and update product_image object
    saveProductImgLoading: false,
    saveProductImgError: null,
    saveProductImgSuccess: false,
}

// First, create the thunk
export const fetchProducts = createAsyncThunk('fetchProducts', async (keyword, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/products?keyword=${keyword}`)
        return [...response.data.data]
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (payload, { rejectWithValue, getState }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        let imageResponse = await axios.post("/api/image/delete", payload.product_image, config);
        const { data } = await axios.delete(`/api/products/${payload._id}`, config)
        // console.log("imageResponse >>", imageResponse);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async (payload, { rejectWithValue, getState }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(`/api/products/${payload._id}`, payload, config)
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const deletePhotoFromDatabase = createAsyncThunk('deletePhotoAndUpdate', async (id, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // Update product image data
        let { data } = await axios.post(`/api/products/image/delete/${id}`, { product_image: { image_url: '', public_id: '' } }, config)
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const savePhotoToDatabase = createAsyncThunk('savePhotoToDatabase', async (payload, { getState, rejectWithValue }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // Update product image data
        let { data } = await axios.post(`/api/products/image/update/${payload._id}`, { product_image: { image_url: payload.image_url, public_id: payload.public_id } }, config)
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const createProduct = createAsyncThunk('createProduct', async (product, { rejectWithValue, getState }) => {
    try {
        const { userInfo } = getState().userLogIn;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/products`, product, config)
        resetCreateProduct();
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        resetCreateProduct: (state, action) => {
            state.createLoading = false;
            state.createError = null;
            state.createSuccess = false;
        },
        resetUpdateProduct: (state, action) => {
            state.updateLoading = false;
            state.updateError = null;
            state.updateSuccess = false;
        },
        resetDeletePhotoFromDatabase: (state, action) => {
            state.deleteProductImgLoading = false
            state.deleteProductImgError = null
            state.deleteProductImgSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.success = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Delete product
            .addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // Create product
            .addCase(createProduct.pending, (state, action) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createLoading = false;
                state.createSuccess = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload
            })
            // Update product
            .addCase(updateProduct.pending, (state, action) => {
                state.updateLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateSuccess = true;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload
            })
            // Delete img and update
            .addCase(deletePhotoFromDatabase.pending, (state, action) => {
                state.deleteProductImgLoading = true;
            })
            .addCase(deletePhotoFromDatabase.fulfilled, (state, action) => {
                state.deleteProductImgLoading = false;
                state.deleteProductImgSuccess = true;
            })
            .addCase(deletePhotoFromDatabase.rejected, (state, action) => {
                state.deleteProductImgLoading = false;
                state.deleteProductImgError = action.payload
            })
            // Save img and update
            .addCase(savePhotoToDatabase.pending, (state, action) => {
                state.saveProductImgLoading = true;
            })
            .addCase(savePhotoToDatabase.fulfilled, (state, action) => {
                state.saveProductImgLoading = false;
                state.saveProductImgSuccess = true;
            })
            .addCase(savePhotoToDatabase.rejected, (state, action) => {
                state.saveProductImgLoading = false;
                state.saveProductImgError = action.payload
            })

    }
})

export const { resetCreateProduct, resetUpdateProduct, resetDeletePhotoFromDatabase } = productsSlice.actions
export default productsSlice.reducer