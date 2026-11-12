
const Profissional = require('../models/Profissional');

const profissionalController = {
    // Cadastrar profissional
    async cadastrar(req, res) {
        try {
            const { nome, email } = req.body;

            if (!nome || !email) {
                return res.status(400).json({
                    mensagem: 'Preencha o nome e o email do profissional.'
                });
            }

            const profissional = await Profissional.criar(nome, email);

            return res.status(201).json({
                mensagem: 'Profissional cadastrado com sucesso!',
                profissional
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar profissional.'
            });
        }
    },

    // Listar profissionais
    async listar(req, res) {
        try {
            const profissionais = await Profissional.listar();

            return res.status(200).json(profissionais);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar profissionais.'
            });
        }
    },

    // Buscar profissional por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const profissional = await Profissional.buscarPorId(id);

            if (!profissional) {
                return res.status(404).json({
                    mensagem: 'Profissional não encontrado.'
                });
            }

            return res.status(200).json(profissional);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar profissional.'
            });
        }
    },

    // Atualizar profissional
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;

            if (!nome || !email) {
                return res.status(400).json({
                    mensagem: 'Preencha o nome e o email do profissional.'
                });
            }

            const profissional = await Profissional.atualizar(
                id,
                nome,
                email
            );

            if (!profissional) {
                return res.status(404).json({
                    mensagem: 'Profissional não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Profissional atualizado com sucesso!',
                profissional
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar profissional.'
            });
        }
    },

    // Excluir profissional
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const profissional = await Profissional.excluir(id);

            if (!profissional) {
                return res.status(404).json({
                    mensagem: 'Profissional não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Profissional excluído com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir profissional.'
            });
        }
    }
};

module.exports = profissionalController;
