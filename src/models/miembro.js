const pool = require('../database');

const Miembro = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM miembros ORDER BY id DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM miembros WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (data) => {
    const { nombre, documento, telefono, email, plan, fecha_inicio, fecha_vencimiento } = data;
    const result = await pool.query(
      `INSERT INTO miembros (nombre, documento, telefono, email, plan, fecha_inicio, fecha_vencimiento)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, documento, telefono, email, plan, fecha_inicio, fecha_vencimiento]
    );
    return result.rows[0];
  },

  update: async (id, data) => {
    const { nombre, documento, telefono, email, plan, fecha_inicio, fecha_vencimiento, estado } = data;
    const result = await pool.query(
      `UPDATE miembros SET nombre=$1, documento=$2, telefono=$3, email=$4, plan=$5,
       fecha_inicio=$6, fecha_vencimiento=$7, estado=$8 WHERE id=$9 RETURNING *`,
      [nombre, documento, telefono, email, plan, fecha_inicio, fecha_vencimiento, estado, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM miembros WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Miembro;