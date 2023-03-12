import asyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary'
import getDataUri from '../utils/dataUri.js';

// @desc        Upload image
// @route       CREATE /api/image/upload
// @access      Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
    const file = req.file;
    const fileUri = getDataUri(file)
    const uploadedImg = await cloudinary.v2.uploader.upload(fileUri.content);

    if (uploadedImg) {
        console.log("uploaded img message form imageContorller >>", uploadedImg);
        res.send(uploadedImg);
    } else {
        res.status(400) // 400 means bad request
        throw new Error('Invalid file data');
    }
})

// @desc        Delete image
// @route       DELETE /api/image/delete
// @access      Private/Admin
const deleteImage = asyncHandler(async (req, res) => {
    let public_id = req.body.public_id
    console.log("public id from controller >>", public_id)
    const deletedImg = await cloudinary.v2.uploader.destroy(public_id);

    if (deletedImg) {
        console.log("deleted img message form imageContorller >>", deleteImage)
        res.send(deletedImg);
    } else {
        res.status(404)
        throw new Error('Public id not found');
    }
})

export { uploadImage, deleteImage };