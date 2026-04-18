const Asistencia = require('../models/asistencia');

const asistenciaController = {
  getAll: async (req, res) => {
    try {
      const asistencia = await Asistencia.getAll();
      res.json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getHoy: async (req, res) => {
    try {
      const asistencia = await Asistencia.getHoy();
      res.json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  registrarEntrada: async (req, res) => {
    try {
      const { miembro_id } = req.body;
      const asistencia = await Asistencia.registrarEntrada(miembro_id);
      res.status(201).json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  registrarSalida: async (req, res) => {
    try {
      const asistencia = await Asistencia.registrarSalida(req.params.id);
      res.json(asistencia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = asistenciaController;