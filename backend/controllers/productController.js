import asyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary'

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

// @desc        Create product
// @route       CREATE /api/products
// @access      Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        product_name,
        product_price,
        image_url,
        public_id,
        product_brand,
        product_category,
        product_stock_count,
        product_description

    } = req.body;

    const product = new productData({
        product_name: product_name,
        product_price: product_price,
        user_id: req.user._id,
        product_image: {
            image_url,
            public_id
        },
        product_brand: product_brand,
        product_category: product_category,
        product_stock_count: product_stock_count,
        product_description: product_description
    })

    const createdProduct = await product.save();

    if (createProduct) {
        res.status(201).json(createdProduct);
    } else {
        res.status(400) // 400 means bad request
        throw new Error('Invalid product data')
    }
})

// @desc        Update product
// @route       PUT /api/products/:id
// @access      Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        product_name,
        product_price,
        product_image,
        product_brand,
        product_category,
        product_stock_count,
        number_of_reviews,
        product_description

    } = req.body;

    console.log("body >>", req.body);

    const product = await productData.findById(req.params.id);

    if (product) {
        product.product_name = product_name;
        product.product_price = product_price;
        product.product_image = product_image;
        product.product_brand = product_brand;
        product.user_id = req.user._id;
        product.product_category = product_category;
        product.product_stock_count = product_stock_count;
        product.number_of_reviews = number_of_reviews;
        product.product_description = product_description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc        Delete product image_url & public_id
// @route       POST /api/products/:id
// @access      Private/Admin
const deleteProductImage = asyncHandler(async (req, res) => {
    const {
        product_image,
    } = req.body;

    let deleteProductImg = await productData.findOneAndUpdate({ _id: req.params.id }, { $set: { product_image } })

    res.send(deleteProductImg)
})

// @desc        Update product image_url & public_id
// @route       POST /api/products/:id
// @access      Private/Admin
const updateProductImage = asyncHandler(async (req, res) => {
    const {
        product_image,
    } = req.body;

    let updateProductImg = await productData.findOneAndUpdate({ _id: req.params.id }, { $set: { product_image } })

    res.send(updateProductImg)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    deleteProductImage,
    updateProductImage
};