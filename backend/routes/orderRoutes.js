import express from "express";
// All Controller
import {
    addOrderItems,
    getOrderById
} from "../controllers/orderController.js";
// Protect Middleware
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;