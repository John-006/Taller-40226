const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudes.controller');

// Ruta para crear (la que ya funciona)
router.post('/', solicitudesController.crear);

// NUEVA: Ruta para listar
router.get('/', solicitudesController.obtenerTodas);

router.put('/:id/devolver', solicitudesController.devolver);
module.exports = router;