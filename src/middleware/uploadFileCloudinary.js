const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'gif'],
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadToCloudinary = async (path, filename) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            folder: 'images/uploads/',
            public_id: `${filename}`,
        });
        const { created_at, url, secure_url, folder } = result;
        return {
            status: 'Success',
            created_at,
            url,
            secure_url,
            folder,
        };
    } catch (error) {
        console.error(error);
    }
};
const uploadCloudinary = multer({ storage: storage });
module.exports = { uploadCloudinary, uploadToCloudinary };
