
const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');
const autenticar = require('../middlewares/authMiddleware');
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

router.use(autenticar);

router.post(
    '/',
    validarDados(['itens']),
    compraController.cadastrar
);

router.get('/', compraController.listar);

router.get('/:id', validarId, compraController.buscar);

module.exports = router;
