const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const authController = {
  login: async (req, res) => {
    try {
      const { usuario, password } = req.body || {};
      if (typeof usuario !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
      }

      const user = await Usuario.getByUsuario(usuario);
      const valida = user ? await bcrypt.compare(password, user.password) : false;

      if (!valida) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      req.session.usuario = {
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol
      };

      res.json({ rol: user.rol, nombre: user.nombre });
    } catch (err) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  // Sesión de demostración: solo lectura, sin credenciales
  invitado: (req, res) => {
    const perfil = req.body && req.body.perfil === 'portero' ? 'guest-portero' : 'guest';
    req.session.usuario = { id: null, nombre: 'Invitado', usuario: 'invitado', rol: perfil };
    res.json({ rol: perfil, nombre: 'Invitado' });
  },

  logout: (req, res) => {
    req.session = null;
    res.json({ mensaje: 'Sesión cerrada' });
  },

  getSession: (req, res) => {
    if (req.session && req.session.usuario) {
      res.json(req.session.usuario);
    } else {
      res.status(401).json({ error: 'No hay sesión activa' });
    }
  }
};

module.exports = authController;
