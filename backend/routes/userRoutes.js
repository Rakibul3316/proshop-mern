import express from "express";
// All Controller
import {
    getUser,
    registerUser,
    updateUserProfile
} from "../controllers/userController.js";
// Protect Middleware
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/profile/update').put(protect, updateUserProfile);
router.post('/login', getUser);
router.post('/', registerUser);

export default router;