
const express = require('express');
const router = express.Router();

const logWhatsAppController = require('../controllers/logWhatsAppController');
const autenticar = require('../middlewares/authMiddleware');
const validarDados = require('../middlewares/validarDados');

router.use(autenticar);

router.post(
    '/',
    validarDados(['mensagem']),
    logWhatsAppController.cadastrar
);

router.get('/', logWhatsAppController.listar);

module.exports = router;
