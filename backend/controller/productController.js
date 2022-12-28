import express from "express";
import asyncHandler from 'express-async-handler';
const router = express.Router();

import productData from '../model/productModel.js';

// @desc        Fetch all products
// @route       GET /api/porduts
// @access      Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await productData.find({});

    res.json({
        data: products,
        success: true
    })
}))

// @desc        Fetch single product
// @route       GET /api/porduts/:id
// @access      Public
router.get('/:id', asyncHandler(async (req, res) => {
    let product = await productData.findById(req.params.id);

    if (product) {
        res.json({
            data: product,
            success: true
        });
    } else {
        res.status(404).json({
            message: 'Product not found!',
            success: false
        })
    }

}))

export default router;