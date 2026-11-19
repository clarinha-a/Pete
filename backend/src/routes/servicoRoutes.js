
const express = require('express');
const router = express.Router();

const servicoController = require('../controllers/servicoController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['nome', 'valor']),
    servicoController.cadastrar
);

router.get('/', servicoController.listar);

router.get('/:id', validarId, servicoController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['nome', 'valor']),
    servicoController.atualizar
);

router.delete('/:id', validarId, servicoController.excluir);

module.exports = router;
