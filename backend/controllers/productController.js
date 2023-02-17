import asyncHandler from 'express-async-handler';

import productData from '../models/productModel.js';

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await productData.find({});

    res.json({
        data: products,
        success: true
    })
})

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      Public
const getProductById = asyncHandler(async (req, res) => {
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

})

// @desc        Delete product
// @route       DELETE /api/products/:id
// @access      Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    let product = await productData.findById(req.params.id);

    if (product) {
        await product.remove()
        res.json({ message: 'Product remove' });
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }

})

export {
    getProducts,
    getProductById,
    deleteProduct
};