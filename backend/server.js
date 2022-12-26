import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js';
import products from './data/products.js';

// Initialize app
const app = express()

// Dot evn configaration
dotenv.config()

// Connected with Database
connectDB();

app.get('/', (req, res) => {
    res.send("hello world ....");
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/product/:id', (req, res) => {
    let product = products.find(p => p._id === req.params.id);

    res.json(product);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));