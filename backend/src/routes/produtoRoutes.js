
const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['nome', 'categoria', 'valor', 'estoque', 'fornecedor_id']),
    produtoController.cadastrar
);

router.get('/', produtoController.listar);

router.get('/:id', validarId, produtoController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['nome', 'categoria', 'valor', 'estoque', 'fornecedor_id']),
    produtoController.atualizar
);

router.delete('/:id', validarId, produtoController.excluir);

module.exports = router;
