import express from "express";
// All Controller
import {
    getUser,
    getUserProfile,
    registerUser
} from "../controllers/userController.js";
// Protect Middleware
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/login', getUser);
router.route('/profile').get(protect, getUserProfile);
router.post('/', registerUser);

export default router;