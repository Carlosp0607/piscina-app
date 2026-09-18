const express = require('express');
const router = express.Router();
const miembroController = require('../controllers/miembroController');
const { permitir } = require('../middleware/auth');

const lectura = permitir('admin', 'portero', 'guest', 'guest-portero');
const escritura = permitir('admin');

router.get('/', lectura, miembroController.getAll);
router.get('/:id', lectura, miembroController.getById);
router.post('/', escritura, miembroController.create);
router.put('/:id', escritura, miembroController.update);
router.delete('/:id', escritura, miembroController.delete);

module.exports = router;
