
const express = require('express');
const router = express.Router();

const disponibilidadeController = require('../controllers/disponibilidadeController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['id_profissional', 'dia_semana', 'hora_inicio', 'hora_fim']),
    disponibilidadeController.cadastrar
);

router.get(
    '/profissional/:id_profissional',
    disponibilidadeController.listarPorProfissional
);

router.get('/:id', validarId, disponibilidadeController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['id_profissional', 'dia_semana', 'hora_inicio', 'hora_fim']),
    disponibilidadeController.atualizar
);

router.delete('/:id', validarId, disponibilidadeController.excluir);

module.exports = router;
