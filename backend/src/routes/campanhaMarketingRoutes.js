
const express = require('express');
const router = express.Router();

const campanhaMarketingController = require('../controllers/campanhaMarketingController');

router.post('/', campanhaMarketingController.cadastrar);
router.get('/', campanhaMarketingController.listar);
router.get('/:id', campanhaMarketingController.buscar);
router.put('/:id', campanhaMarketingController.atualizar);
router.delete('/:id', campanhaMarketingController.excluir);

module.exports = router;
