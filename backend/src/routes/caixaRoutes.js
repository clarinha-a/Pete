
const express = require('express');
const router = express.Router();

const caixaController = require('../controllers/caixaController');
const validarId = require('../middlewares/validarId');

router.post('/abrir', caixaController.abrir);

router.get('/', caixaController.listar);

router.get('/aberto', caixaController.buscarAberto);

router.get('/:id', validarId, caixaController.buscar);

router.put('/:id/fechar', validarId, caixaController.fechar);

module.exports = router;
