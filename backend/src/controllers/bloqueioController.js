
const Bloqueio = require('../models/Bloqueio');

const bloqueioController = {
    // Cadastrar bloqueio
    async cadastrar(req, res) {
        try {
            const { id_profissional, data_inicio, data_fim, motivo } = req.body;

            if (!id_profissional || !data_inicio || !data_fim || !motivo) {
                return res.status(400).json({
                    mensagem: 'Preencha todos os campos do bloqueio.'
                });
            }

            if (data_inicio > data_fim) {
                return res.status(400).json({
                    mensagem: 'A data de início deve ser anterior ou igual à data de término.'
                });
            }

            const bloqueio = await Bloqueio.criar(
                id_profissional,
                data_inicio,
                data_fim,
                motivo
            );

            return res.status(201).json({
                mensagem: 'Bloqueio cadastrado com sucesso!',
                bloqueio
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar bloqueio.'
            });
        }
    },

    // Listar bloqueios de um profissional
    async listarPorProfissional(req, res) {
        try {
            const { id_profissional } = req.params;

            const bloqueios = await Bloqueio.listarPorProfissional(
                id_profissional
            );

            return res.status(200).json(bloqueios);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar bloqueios.'
            });
        }
    },

    // Buscar bloqueio por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const bloqueio = await Bloqueio.buscarPorId(id);

            if (!bloqueio) {
                return res.status(404).json({
                    mensagem: 'Bloqueio não encontrado.'
                });
            }

            return res.status(200).json(bloqueio);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar bloqueio.'
            });
        }
    },

    // Atualizar bloqueio
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { data_inicio, data_fim, motivo } = req.body;

            if (!data_inicio || !data_fim || !motivo) {
                return res.status(400).json({
                    mensagem: 'Preencha todos os campos do bloqueio.'
                });
            }

            if (data_inicio > data_fim) {
                return res.status(400).json({
                    mensagem: 'A data de início deve ser anterior ou igual à data de término.'
                });
            }

            const bloqueio = await Bloqueio.atualizar(
                id,
                data_inicio,
                data_fim,
                motivo
            );

            if (!bloqueio) {
                return res.status(404).json({
                    mensagem: 'Bloqueio não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Bloqueio atualizado com sucesso!',
                bloqueio
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar bloqueio.'
            });
        }
    },

    // Excluir bloqueio
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const bloqueio = await Bloqueio.excluir(id);

            if (!bloqueio) {
                return res.status(404).json({
                    mensagem: 'Bloqueio não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Bloqueio excluído com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir bloqueio.'
            });
        }
    }
};

module.exports = bloqueioController;
