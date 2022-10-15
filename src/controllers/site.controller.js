class siteController {
    static async getHomePage(req, res) {
        return res.render('index', {
            title: 'HomePage',
        });
    }
    static getUploadMulterPage(req, res) {
        return res.render('uploadMulter', {
            title: 'UploadToMulter',
        });
    }
    static getUploadCloudinary(req, res) {
        return res.render('uploadCloudinary', {
            title: 'UploadTodCloudinary',
        });
    }
}

module.exports = siteController;
