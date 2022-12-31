import express from "express";
import asyncHandler from 'express-async-handler';
const router = express.Router();

import productData from '../model/productModel.js';

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await productData.find({});

    res.json({
        data: products,
        success: true
    })
}))

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      Public
router.get('/:id', asyncHandler(async (req, res) => {
    let product = await productData.findById(req.params.id);

    if (product) {
        res.json({
            data: product,
            success: true
        });
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }

}))

export default router;