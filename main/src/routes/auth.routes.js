const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginValidator = require('../validators/login.validator');

router.post('/login', loginValidator, authController.login);

module.exports = router;