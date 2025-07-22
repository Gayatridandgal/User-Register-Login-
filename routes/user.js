const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { registerValidation, loginValidation } = require('../middleware/validation');

router.post('/register', registerValidation, userController.registerUser);
router.post('/login', loginValidation, userController.loginUser);
router.get('/', userController.getAllUsers);

module.exports = router;
