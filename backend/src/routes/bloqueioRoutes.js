
const express = require('express');
const router = express.Router();

const bloqueioController = require('../controllers/bloqueioController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['id_profissional', 'data_inicio', 'data_fim']),
    bloqueioController.cadastrar
);

router.get(
    '/profissional/:id_profissional',
    bloqueioController.listarPorProfissional
);

router.get('/:id', validarId, bloqueioController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['id_profissional', 'data_inicio', 'data_fim']),
    bloqueioController.atualizar
);

router.delete('/:id', validarId, bloqueioController.excluir);

module.exports = router;
