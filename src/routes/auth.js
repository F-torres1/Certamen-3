const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');

// router.get('/', authController.getAllMotos);
router.get('/login', authController.login);
router.get('/register', authController.register);
// router.post('/', authController.createMoto);
// router.get('/:id/edit', authController.updateMotoForm);
router.post('/login', authController.sendLogin);
router.post('/register', authController.sendRegister);

module.exports = router;
