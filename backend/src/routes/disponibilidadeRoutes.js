
const express = require('express');
const router = express.Router();

const disponibilidadeController = require('../controllers/disponibilidadeController');

router.post('/', disponibilidadeController.cadastrar);

router.get('/profissional/:id_profissional', disponibilidadeController.listarPorProfissional);

router.get('/:id', disponibilidadeController.buscar);

router.put('/:id', disponibilidadeController.atualizar);

router.delete('/:id', disponibilidadeController.excluir);

module.exports = router;
