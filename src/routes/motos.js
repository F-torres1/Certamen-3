const express = require('express');
const router = express.Router();
const motosController = require('../controllers/motosController');

router.get('/', motosController.getAllMotos);
router.get('/new', motosController.createMotoForm);
router.get('/:id', motosController.getMotoById);
router.post('/', motosController.createMoto);
router.get('/:id/edit', motosController.updateMotoForm);
router.post('/:id/edit', motosController.updateMoto);
router.post('/:id/delete', motosController.deleteMoto);

module.exports = router;
