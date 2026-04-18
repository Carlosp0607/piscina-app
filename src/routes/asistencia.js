const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

router.get('/', asistenciaController.getAll);
router.get('/hoy', asistenciaController.getHoy);
router.post('/entrada', asistenciaController.registrarEntrada);
router.patch('/:id/salida', asistenciaController.registrarSalida);

module.exports = router;