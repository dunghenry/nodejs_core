const express = require('express');

const router = express.Router();
const testController = require('../../controllers/apis/test.controller');
router.get('/todos', testController.getTodos);
module.exports = router;
