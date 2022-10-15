const express = require('express');
const router = express.Router();
const userSequelizeController = require('../../controllers/apis/user.sequelize.controller');
router.get('/', userSequelizeController.getUsers);
router.post('/', userSequelizeController.createUser);
router.get('/:id', userSequelizeController.getUserById);
router.delete('/:id', userSequelizeController.deleteUserById);
router.put('/:id', userSequelizeController.updateUserById);

module.exports = router;
