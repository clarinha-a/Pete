
const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');
const autenticar = require('../middlewares/authMiddleware');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.use(autenticar);

router.post(
    '/',
    validarDados(['data_hora', 'id_pet', 'id_servico', 'id_profissional']),
    agendamentoController.cadastrar
);

router.get('/', agendamentoController.listar);

router.get('/:id', validarId, agendamentoController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['data_hora', 'status']),
    agendamentoController.atualizar
);

router.delete('/:id', validarId, agendamentoController.excluir);

module.exports = router;
