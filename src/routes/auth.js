const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');
const { validateInput } = require('../middlewares/validateInput');

const { userSchema } = require('../schemas/user');


router.get('/login',  authController.login);
router.get('/register', authController.register);
router.post('/login', validateInput(userSchema), authController.sendLogin);
router.post('/register', validateInput(userSchema), authController.sendRegister);

module.exports = router;
