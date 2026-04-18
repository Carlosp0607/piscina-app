const pool = require('../database');

const Asistencia = {
  getAll: async () => {
    const result = await pool.query(`
      SELECT a.*, m.nombre, m.documento 
      FROM asistencia a
      JOIN miembros m ON a.miembro_id = m.id
      ORDER BY a.created_at DESC
    `);
    return result.rows;
  },

  registrarEntrada: async (miembro_id) => {
    const result = await pool.query(
      `INSERT INTO asistencia (miembro_id) VALUES ($1) RETURNING *`,
      [miembro_id]
    );
    return result.rows[0];
  },

  registrarSalida: async (id) => {
    const result = await pool.query(
      `UPDATE asistencia SET hora_salida = CURRENT_TIME WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },

  getHoy: async () => {
    const result = await pool.query(`
      SELECT a.*, m.nombre, m.documento
      FROM asistencia a
      JOIN miembros m ON a.miembro_id = m.id
      WHERE a.fecha = CURRENT_DATE
      ORDER BY a.hora_entrada DESC
    `);
    return result.rows;
  }
};

module.exports = Asistencia;