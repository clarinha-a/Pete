
const express = require('express');
const router = express.Router();

const bloqueioController = require('../controllers/bloqueioController');

router.post('/', bloqueioController.cadastrar);

router.get('/profissional/:id_profissional', bloqueioController.listarPorProfissional);

router.get('/:id', bloqueioController.buscar);

router.put('/:id', bloqueioController.atualizar);

router.delete('/:id', bloqueioController.excluir);

module.exports = router;
