const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/verifyToken');
const authController = require('../../controllers/apis/auth.controller');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', verifyToken, authController.logout);
router.post('/refresh', authController.refreshToken);
module.exports = router;
