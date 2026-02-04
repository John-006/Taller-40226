const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libros.controller');

router.get('/', librosController.buscar);

module.exports = router;
