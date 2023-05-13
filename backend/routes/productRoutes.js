import express from "express";
const router = express.Router();

// Controllers
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    deleteProductImage,
    updateProductImage,
    createProductReview
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/image/delete/:id').post(protect, admin, deleteProductImage,
);
router.route('/image/update/:id').post(protect, admin, updateProductImage);

export default router;