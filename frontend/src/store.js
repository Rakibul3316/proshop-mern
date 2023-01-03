import { configureStore, } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        product: productDetailsSlice,
        cart: cartSlice
    },
})