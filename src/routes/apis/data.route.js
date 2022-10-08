const express = require('express');
const router = express.Router();
const dataController = require('../../controllers/apis/data.controller');
router.get('/comments', dataController.getComments);
module.exports = router;
