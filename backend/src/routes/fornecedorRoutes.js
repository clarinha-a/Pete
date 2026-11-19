
const express = require('express');
const router = express.Router();

const fornecedorController = require('../controllers/fornecedorController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['nome', 'cnpj', 'telefone']),
    fornecedorController.cadastrar
);

router.get('/', fornecedorController.listar);

router.get('/:id', validarId, fornecedorController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['nome', 'cnpj', 'telefone']),
    fornecedorController.atualizar
);

router.delete('/:id', validarId, fornecedorController.excluir);

module.exports = router;
