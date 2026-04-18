const Miembro = require('../models/miembro');

const miembroController = {
  getAll: async (req, res) => {
    try {
      const miembros = await Miembro.getAll();
      res.json(miembros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const miembro = await Miembro.getById(req.params.id);
      res.json(miembro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const miembro = await Miembro.create(req.body);
      res.status(201).json(miembro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const miembro = await Miembro.update(req.params.id, req.body);
      res.json(miembro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Miembro.delete(req.params.id);
      res.json({ mensaje: 'Miembro eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = miembroController;