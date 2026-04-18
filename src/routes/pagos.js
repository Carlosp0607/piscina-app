const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.get('/hoy', pagoController.getHoy);
router.get('/total-hoy', pagoController.getTotalHoy);
router.get('/mes', pagoController.getByMes);
router.get('/rango', pagoController.getByRango);
router.get('/:id', pagoController.getById);
router.get('/', pagoController.getAll);
router.post('/', pagoController.create);
router.put('/:id', pagoController.update);
router.delete('/:id', pagoController.delete);

module.exports = router;