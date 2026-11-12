
const express = require('express');
const router = express.Router();

const logWhatsAppController = require('../controllers/logWhatsAppController');
const autenticar = require('../middlewares/authMiddleware');

// Todas as rotas exigem autenticação
router.use(autenticar);

router.post('/', logWhatsAppController.cadastrar);

router.get('/', logWhatsAppController.listar);

module.exports = router;
