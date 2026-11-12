
const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');
const autenticar = require('../middlewares/authMiddleware');

// Todas as rotas exigem autenticação
router.post('/', autenticar, agendamentoController.cadastrar);

router.get('/', autenticar, agendamentoController.listar);

router.get('/:id', autenticar, agendamentoController.buscar);

router.put('/:id', autenticar, agendamentoController.atualizar);

router.delete('/:id', autenticar, agendamentoController.excluir);

module.exports = router;
