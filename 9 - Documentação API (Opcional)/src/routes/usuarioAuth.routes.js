const express = require('express');
const router = express.Router();
const usuarioAuthController = require('../controllers/usuarioAuthController');

router.post('/cadastrar', usuarioAuthController.cadastrar);
router.post('/login', usuarioAuthController.login);

module.exports = router; 