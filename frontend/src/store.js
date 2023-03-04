import { configureStore, } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';
import adminUserSlice from './slices/adminUserSlice';
import imageSlice from './slices/imageSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        product: productDetailsSlice,
        cart: cartSlice,
        userLogIn: userSlice,
        order: orderSlice,
        usersForAdmin: adminUserSlice,
        image: imageSlice
    },
})