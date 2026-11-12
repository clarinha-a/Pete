
const Disponibilidade = require('../models/Disponibilidade');

const disponibilidadeController = {
    // Cadastrar disponibilidade
    async cadastrar(req, res) {
        try {
            const { id_profissional, dia_semana, hora_inicio, hora_fim } = req.body;

            if (!id_profissional || !dia_semana || !hora_inicio || !hora_fim) {
                return res.status(400).json({
                    mensagem: 'Preencha todos os campos da disponibilidade.'
                });
            }

            if (hora_inicio >= hora_fim) {
                return res.status(400).json({
                    mensagem: 'O horário de início deve ser anterior ao horário de término.'
                });
            }

            const disponibilidade = await Disponibilidade.criar(
                id_profissional,
                dia_semana,
                hora_inicio,
                hora_fim
            );

            return res.status(201).json({
                mensagem: 'Disponibilidade cadastrada com sucesso!',
                disponibilidade
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar disponibilidade.'
            });
        }
    },

    // Listar disponibilidades de um profissional
    async listarPorProfissional(req, res) {
        try {
            const { id_profissional } = req.params;

            const disponibilidades = await Disponibilidade.listarPorProfissional(
                id_profissional
            );

            return res.status(200).json(disponibilidades);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar disponibilidades.'
            });
        }
    },

    // Buscar disponibilidade por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const disponibilidade = await Disponibilidade.buscarPorId(id);

            if (!disponibilidade) {
                return res.status(404).json({
                    mensagem: 'Disponibilidade não encontrada.'
                });
            }

            return res.status(200).json(disponibilidade);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar disponibilidade.'
            });
        }
    },

    // Atualizar disponibilidade
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { dia_semana, hora_inicio, hora_fim } = req.body;

            if (!dia_semana || !hora_inicio || !hora_fim) {
                return res.status(400).json({
                    mensagem: 'Preencha todos os campos da disponibilidade.'
                });
            }

            if (hora_inicio >= hora_fim) {
                return res.status(400).json({
                    mensagem: 'O horário de início deve ser anterior ao horário de término.'
                });
            }

            const disponibilidade = await Disponibilidade.atualizar(
                id,
                dia_semana,
                hora_inicio,
                hora_fim
            );

            if (!disponibilidade) {
                return res.status(404).json({
                    mensagem: 'Disponibilidade não encontrada.'
                });
            }

            return res.status(200).json({
                mensagem: 'Disponibilidade atualizada com sucesso!',
                disponibilidade
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar disponibilidade.'
            });
        }
    },

    // Excluir disponibilidade
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const disponibilidade = await Disponibilidade.excluir(id);

            if (!disponibilidade) {
                return res.status(404).json({
                    mensagem: 'Disponibilidade não encontrada.'
                });
            }

            return res.status(200).json({
                mensagem: 'Disponibilidade excluída com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir disponibilidade.'
            });
        }
    }
};

module.exports = disponibilidadeController;
