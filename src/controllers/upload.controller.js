const cloudinary = require('cloudinary').v2;
const { uploadToCloudinary } = require('../middleware/uploadFileCloudinary');
class uploadController {
    static postUpload(req, res) {
        return res.status(200).json(req.file);
    }
    static async postUploadCloudinary(req, res) {
        // console.log(req.file);
        const result = await uploadToCloudinary(
            req.file.path,
            req.file.filename,
        );
        return res.status(200).json(result);
    }
    static getFileUpload(req, res) {
        cloudinary.api.resources(
            {
                type: 'upload',
                prefix: 'samples/animals',
            },
            (error, result) => {
                if (error) {
                    return res.status(500).json(error);
                }
                return res.status(200).json(result);
            },
        );
    }
}

module.exports = uploadController;
