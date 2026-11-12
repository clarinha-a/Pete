
const express = require('express');
const router = express.Router();

const servicoController = require('../controllers/servicoController');

router.post('/', servicoController.cadastrar);

router.get('/', servicoController.listar);

router.get('/:id', servicoController.buscar);

router.put('/:id', servicoController.atualizar);

router.delete('/:id', servicoController.excluir);

module.exports = router;
