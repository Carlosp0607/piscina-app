const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Bloquea acciones de modificación a los usuarios invitados
const soloUsuarios = (req, res, next) => {
  const isGuest = req.headers['x-user-role'] === 'guest' || req.headers['authorization'] === 'Bearer invitado-token';
  if (isGuest) {
    return res.status(403).json({ error: "Los invitados solo tienen permisos de lectura." });
  }
  next();
};

// RUTAS PÚBLICAS (Lectura abierta para todos)
router.get('/hoy', pagoController.getHoy);
router.get('/total-hoy', pagoController.getTotalHoy);
router.get('/mes', pagoController.getByMes);
router.get('/rango', pagoController.getByRango);
router.get('/:id', pagoController.getById);
router.get('/', pagoController.getAll);

// RUTAS PROTEGIDAS (Bloqueadas para invitados)
router.post('/', soloUsuarios, pagoController.create);
router.put('/:id', soloUsuarios, pagoController.update);
router.delete('/:id', soloUsuarios, pagoController.delete);

module.exports = router;
