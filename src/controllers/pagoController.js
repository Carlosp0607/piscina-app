const Pago = require('../models/pago');

const pagoController = {
  getAll: async (req, res) => {
    try {
      const pagos = await Pago.getAll();
      res.json(pagos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getHoy: async (req, res) => {
    try {
      const pagos = await Pago.getHoy();
      res.json(pagos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTotalHoy: async (req, res) => {
    try {
      const total = await Pago.getTotalHoy();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const pago = await Pago.getById(req.params.id);
      res.json(pago);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const pago = await Pago.create(req.body);
      res.status(201).json(pago);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const pago = await Pago.update(req.params.id, req.body);
      res.json(pago);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Pago.delete(req.params.id);
      res.json({ mensaje: 'Pago eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByMes: async (req, res) => {
    try {
      const { mes, anio } = req.query;
      const pagos = await Pago.getByMes(mes, anio);
      const total = await Pago.getTotalByMes(mes, anio);
      res.json({ pagos, total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByRango: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const pagos = await Pago.getByRango(fechaInicio, fechaFin);
      const total = await Pago.getTotalByRango(fechaInicio, fechaFin);
      res.json({ pagos, total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = pagoController;