const express = require('express');

const siteController = require('../controllers/site.controller');
const router = express.Router();
router.get('/', siteController.getHomePage);
module.exports = router;
