const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const { permitir } = require('../middleware/auth');

const lectura = permitir('admin', 'guest');
const escritura = permitir('admin');

router.get('/hoy', lectura, pagoController.getHoy);
router.get('/total-hoy', lectura, pagoController.getTotalHoy);
router.get('/mes', lectura, pagoController.getByMes);
router.get('/rango', lectura, pagoController.getByRango);
router.get('/:id', lectura, pagoController.getById);
router.get('/', lectura, pagoController.getAll);

router.post('/', escritura, pagoController.create);
router.put('/:id', escritura, pagoController.update);
router.delete('/:id', escritura, pagoController.delete);

module.exports = router;
