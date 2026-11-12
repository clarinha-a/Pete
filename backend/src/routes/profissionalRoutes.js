
const express = require('express');
const router = express.Router();

const profissionalController = require('../controllers/profissionalController');

router.post('/', profissionalController.cadastrar);

router.get('/', profissionalController.listar);

router.get('/:id', profissionalController.buscar);

router.put('/:id', profissionalController.atualizar);

router.delete('/:id', profissionalController.excluir);

module.exports = router;
