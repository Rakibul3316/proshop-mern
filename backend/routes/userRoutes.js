import express from "express";
// All Controller
import {
    getUser,
    registerUser,
    updateUserProfile,
    getUsers
} from "../controllers/userController.js";
// Auth Middleware
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/profile/update').put(protect, updateUserProfile);
router.post('/login', getUser);
router.route('/').post(registerUser).get(protect, admin, getUsers);

export default router;