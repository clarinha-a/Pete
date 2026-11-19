
const express = require('express');
const router = express.Router();

const profissionalController = require('../controllers/profissionalController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['nome', 'email']),
    profissionalController.cadastrar
);

router.get('/', profissionalController.listar);

router.get('/:id', validarId, profissionalController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['nome', 'email']),
    profissionalController.atualizar
);

router.delete('/:id', validarId, profissionalController.excluir);

module.exports = router;
