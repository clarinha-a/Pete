
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Cadastro
router.post('/', usuarioController.cadastrar);

// Login
router.post('/login', usuarioController.login);

module.exports = router;
