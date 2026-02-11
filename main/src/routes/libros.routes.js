const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libros.controller');

router.get('/', librosController.obtenerTodos);
router.get('/buscar', librosController.buscar);
router.get('/:id', librosController.obtenerPorId);
router.post('/', librosController.crear);
router.put('/:id', librosController.actualizar);
router.delete('/:id', librosController.eliminar);

module.exports = router;
