const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao');

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuário]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/perfil', autenticacao, usuarioController.perfil);

module.exports = router; 