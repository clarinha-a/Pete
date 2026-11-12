
const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const autenticar = require('../middlewares/authMiddleware');

// Todas as rotas exigem autenticação JWT

// Cadastrar pet
router.post('/', autenticar, petController.cadastrar);

// Listar pets do usuário
router.get('/', autenticar, petController.listar);

// Buscar um pet específico
router.get('/:id', autenticar, petController.buscar);

// Atualizar pet
router.put('/:id', autenticar, petController.atualizar);

// Excluir pet
router.delete('/:id', autenticar, petController.excluir);

module.exports = router;
