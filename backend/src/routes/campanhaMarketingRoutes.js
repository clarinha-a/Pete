
const express = require('express');
const router = express.Router();

const campanhaMarketingController = require('../controllers/campanhaMarketingController');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.post(
    '/',
    validarDados(['nome', 'plataforma', 'orcamento']),
    campanhaMarketingController.cadastrar
);

router.get('/', campanhaMarketingController.listar);

router.get('/:id', validarId, campanhaMarketingController.buscar);

router.put(
    '/:id',
    validarId,
    validarDados(['nome', 'plataforma', 'orcamento']),
    campanhaMarketingController.atualizar
);

router.delete('/:id', validarId, campanhaMarketingController.excluir);

module.exports = router;
