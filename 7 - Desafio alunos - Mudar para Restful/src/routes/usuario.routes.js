const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao');

router.get('/perfil', autenticacao, usuarioController.perfil);

module.exports = router; 