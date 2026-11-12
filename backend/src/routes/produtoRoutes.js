
const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.cadastrar);

router.get('/', produtoController.listar);

router.get('/:id', produtoController.buscar);

router.put('/:id', produtoController.atualizar);

router.delete('/:id', produtoController.excluir);

module.exports = router;
