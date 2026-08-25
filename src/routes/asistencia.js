const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Middleware opcional para bloquear escritura a invitados
const soloUsuarios = (req, res, next) => {
  const isGuest = req.headers['x-user-role'] === 'guest' || req.headers['authorization'] === 'Bearer invitado-token';
  if (isGuest) {
    return res.status(403).json({ error: "Los invitados solo tienen permisos de lectura." });
  }
  next();
};

// RUTAS PÚBLICAS (Lectura permitida a visitantes e invitados)
router.get('/', asistenciaController.getAll);
router.get('/hoy', asistenciaController.getHoy);
router.get('/mes', asistenciaController.getByMes);
router.get('/rango', asistenciaController.getByRango);

// RUTAS PROTEGIDAS (Escritura bloqueada a invitados)
router.post('/entrada', soloUsuarios, asistenciaController.registrarEntrada);
router.patch('/:id/salida', soloUsuarios, asistenciaController.registrarSalida);

module.exports = router;
