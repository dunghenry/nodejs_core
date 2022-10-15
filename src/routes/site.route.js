const express = require('express');
const siteController = require('../controllers/site.controller');
const router = express.Router();
router.get('/', siteController.getHomePage);
router.get('/upload-multer', siteController.getUploadMulterPage);
router.get('/upload-cloudinary', siteController.getUploadCloudinary);
module.exports = router;
