const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.get('/', pagoController.getAll);
router.get('/hoy', pagoController.getHoy);
router.get('/total-hoy', pagoController.getTotalHoy);
router.get('/:id', pagoController.getById);
router.post('/', pagoController.create);
router.put('/:id', pagoController.update);
router.delete('/:id', pagoController.delete);

module.exports = router;