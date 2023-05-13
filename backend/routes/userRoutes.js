import express from "express";
// All Controller
import {
    getUser,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUserByAdmin
} from "../controllers/userController.js";
// Auth Middleware
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.put('/profile/update', protect, updateUserProfile);
router.post('/login', getUser);
router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUserByAdmin)

export default router;