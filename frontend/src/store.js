import { configureStore, } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        product: productDetailsSlice
    },
})