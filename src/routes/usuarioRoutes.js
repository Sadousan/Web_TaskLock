const express = require('express');
const router = express.Router();
const { cadastrarUsuario } = require('../controllers/usuarioController');

// Rota de cadastro de usuário
router.post('/usuarios/cadastrar', cadastrarUsuario);

module.exports = router;
