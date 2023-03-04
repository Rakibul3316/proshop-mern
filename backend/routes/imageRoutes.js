import express from "express";
const router = express.Router();

// Controllers
import { uploadImage, deleteImage } from "../controllers/imageController.js";
import { protect, admin } from '../middleware/authMiddleware.js'
import singleUpload from "../middleware/multer.js";

router.route('/upload').post(protect, admin, singleUpload, uploadImage);
router.route('/delete').post(protect, admin, deleteImage);

export default router;