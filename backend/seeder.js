import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/user.js';
import products from './data/products.js';
import userData from './models/userModel.js';
import productData from './models/productModel.js';
import orderData from './models/orderModel.js';
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const insertData = async () => {
    try {
        const createUsers = await userData.insertMany(users);
        const adminUser = createUsers[0]._id;
        const sampleProducts = products.map(product => {
            return { ...product, user_id: adminUser }
        });

        await productData.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await userData.deleteMany()
        await productData.deleteMany()
        await orderData.deleteMany()

        console.log("Data Detroyed!".red.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    insertData()
}
