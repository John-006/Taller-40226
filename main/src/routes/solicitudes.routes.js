const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudes.controller');
const requireAuth = require('../middlewares/requireAuth');
const solicitudValidator = require('../validators/solicitud.validator');

router.post('/', requireAuth, solicitudValidator, solicitudesController.crear);

module.exports = router;