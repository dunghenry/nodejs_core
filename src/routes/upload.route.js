const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const upload = require('../middleware/uploadFile');
const { uploadCloudinary } = require('../middleware/uploadFileCloudinary');
router.post('/upload', upload.single('image'), uploadController.postUpload);
router.post(
    '/uploadCloudinary',
    uploadCloudinary.single('image'),
    uploadController.postUploadCloudinary,
);
router.get('/fileUpload', uploadController.getFileUpload);
module.exports = router;
