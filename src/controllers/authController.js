const Usuario = require('../models/usuario');

const authController = {
  login: async (req, res) => {
    try {
      const { usuario, password } = req.body;
      const user = await Usuario.getByUsuario(usuario);

      if (!user || user.password !== password) {
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
      res.status(500).json({ error: err.message });
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.json({ mensaje: 'Sesión cerrada' });
  },

  getSession: (req, res) => {
    if (req.session.usuario) {
      res.json(req.session.usuario);
    } else {
      res.status(401).json({ error: 'No hay sesión activa' });
    }
  }
};

module.exports = authController;