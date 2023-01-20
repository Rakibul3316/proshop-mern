import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';

// Initialize app
const app = express()

// Body parser
app.use(express.json())

// Dot evn configaration
dotenv.config()

// Connected with Database
connectDB();

// Initila Route
app.get('/', (req, res) => {
    res.send("hello world ....");
})

// All Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error Middleware
app.use(notFound)
app.use(errorHandler)

// Port
const PORT = process.env.PORT || 5000;

// Listening port
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));