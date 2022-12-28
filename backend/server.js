import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js';

// Controller
import products_controller from './controller/productController.js'

// Initialize app
const app = express()

// Dot evn configaration
dotenv.config()

// Connected with Database
connectDB();

app.get('/', (req, res) => {
    res.send("hello world ....");
})

app.use('/api/products', products_controller)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));