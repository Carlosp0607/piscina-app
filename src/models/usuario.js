const pool = require('../database');

const Usuario = {
  getByUsuario: async (usuario) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    return result.rows[0];
  }
};

module.exports = Usuario;