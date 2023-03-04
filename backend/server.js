import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cloudinary from 'cloudinary';

// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

// Initialize app
const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dot evn configaration
dotenv.config()

// Connected with Database
connectDB();

// Configer cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Initila Route
app.get('/', (req, res) => {
    res.send("hello world ....");
})

// All Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/image', imageRoutes);

// Error Middleware
app.use(notFound)
app.use(errorHandler)

// Port
const PORT = process.env.PORT || 5000;

// Listening port
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));