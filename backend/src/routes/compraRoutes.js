
const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');
const autenticar = require('../middlewares/authMiddleware');

// Todas as rotas exigem autenticação
router.use(autenticar);

router.post('/', compraController.cadastrar);

router.get('/', compraController.listar);

router.get('/:id', compraController.buscar);

module.exports = router;
