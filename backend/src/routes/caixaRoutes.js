
const express = require('express');
const router = express.Router();

const caixaController = require('../controllers/caixaController');

router.post('/abrir', caixaController.abrir);

router.get('/', caixaController.listar);

router.get('/aberto', caixaController.buscarAberto);

router.get('/:id', caixaController.buscar);

router.put('/:id/fechar', caixaController.fechar);

module.exports = router;
