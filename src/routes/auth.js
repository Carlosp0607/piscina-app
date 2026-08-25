const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/session', authController.getSession);

// Nueva ruta para acceso en modo invitado
router.post('/invitado', (req, res) => {
  res.json({
    mensaje: "Acceso como invitado concedido",
    usuario: { nombre: "Invitado", rol: "guest" }
  });
});

module.exports = router;
