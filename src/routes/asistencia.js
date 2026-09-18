const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');
const { permitir } = require('../middleware/auth');

const lectura = permitir('admin', 'portero', 'guest', 'guest-portero');
const escritura = permitir('admin', 'portero');

router.get('/', lectura, asistenciaController.getAll);
router.get('/hoy', lectura, asistenciaController.getHoy);
router.get('/mes', lectura, asistenciaController.getByMes);
router.get('/rango', lectura, asistenciaController.getByRango);

router.post('/entrada', escritura, asistenciaController.registrarEntrada);
router.patch('/:id/salida', escritura, asistenciaController.registrarSalida);

module.exports = router;
