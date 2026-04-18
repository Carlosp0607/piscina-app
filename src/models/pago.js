const pool = require('../database');

const Pago = {
  getAll: async () => {
    const result = await pool.query(`
      SELECT p.*, m.nombre, m.documento
      FROM pagos p
      JOIN miembros m ON p.miembro_id = m.id
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  },

  getHoy: async () => {
    const result = await pool.query(`
      SELECT p.*, m.nombre, m.documento
      FROM pagos p
      JOIN miembros m ON p.miembro_id = m.id
      WHERE p.fecha = CURRENT_DATE
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  },

  getTotalHoy: async () => {
    const result = await pool.query(`
      SELECT COALESCE(SUM(monto), 0) as total
      FROM pagos
      WHERE fecha = CURRENT_DATE
    `);
    return result.rows[0].total;
  },

  create: async (data) => {
    const { miembro_id, concepto, monto, metodo_pago, observaciones, fecha, fecha_finalizacion } = data;
    const result = await pool.query(
      `INSERT INTO pagos (miembro_id, concepto, monto, metodo_pago, observaciones, fecha, fecha_finalizacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [miembro_id, concepto, monto, metodo_pago, observaciones, fecha, fecha_finalizacion]
    );
    return result.rows[0];
  },

  update: async (id, data) => {
    const { miembro_id, concepto, monto, metodo_pago, observaciones, fecha, fecha_finalizacion } = data;
    const result = await pool.query(
      `UPDATE pagos SET miembro_id=$1, concepto=$2, monto=$3, metodo_pago=$4, 
       observaciones=$5, fecha=$6, fecha_finalizacion=$7 WHERE id=$8 RETURNING *`,
      [miembro_id, concepto, monto, metodo_pago, observaciones, fecha, fecha_finalizacion, id]
    );
    return result.rows[0];
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM pagos WHERE id = $1', [id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM pagos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Pago;