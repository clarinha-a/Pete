
const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');
const autenticar = require('../middlewares/authMiddleware');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.use(autenticar);

router.post(
    '/',
    validarDados(['nome', 'idade', 'raca']),
    petController.cadastrar
);

router.get('/', petController.listar);

router.get('/:id', validarId, petController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['nome', 'idade', 'raca']),
    petController.atualizar
);

router.delete('/:id', validarId, petController.excluir);

module.exports = router;
