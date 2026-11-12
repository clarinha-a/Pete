
const LogWhatsApp = require('../models/LogWhatsApp');

const logWhatsAppController = {
    // Registrar mensagem enviada
    async cadastrar(req, res) {
        try {
            const { mensagem } = req.body;
            const id_usuario = req.usuario.id;

            if (!mensagem || !mensagem.trim()) {
                return res.status(400).json({
                    mensagem: 'Informe o conteúdo da mensagem.'
                });
            }

            const log = await LogWhatsApp.criar(
                mensagem,
                id_usuario
            );

            return res.status(201).json({
                mensagem: 'Registro da mensagem criado com sucesso!',
                log
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao registrar mensagem.'
            });
        }
    },

    // Listar mensagens do usuário autenticado
    async listar(req, res) {
        try {
            const logs = await LogWhatsApp.listarPorUsuario(
                req.usuario.id
            );

            return res.status(200).json(logs);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar mensagens.'
            });
        }
    }
};

module.exports = logWhatsAppController;
