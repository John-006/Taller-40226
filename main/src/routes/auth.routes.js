const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginValidator = require('../validators/login.validator'); // 1. Importarlo

// 2. Agregarlo como middleware antes del controlador
router.post('/login', loginValidator, authController.login);

module.exports = router;