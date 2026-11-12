
const Agendamento = require('../models/Agendamento');

const agendamentoController = {
    // Cadastrar agendamento
    async cadastrar(req, res) {
        try {
            const { data_hora, id_pet, id_servico, id_profissional } = req.body;

            if (!data_hora || !id_pet || !id_servico || !id_profissional) {
                return res.status(400).json({
                    mensagem: 'Preencha todos os campos obrigatórios.'
                });
            }

            const agendamento = await Agendamento.criar(
                data_hora,
                'Pendente',
                req.usuario.id,
                id_pet,
                id_servico,
                id_profissional
            );

            return res.status(201).json({
                mensagem: 'Agendamento realizado com sucesso!',
                agendamento
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao realizar agendamento.'
            });
        }
    },

    // Listar agendamentos do usuário
    async listar(req, res) {
        try {
            const agendamentos = await Agendamento.listarPorUsuario(req.usuario.id);

            return res.status(200).json(agendamentos);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar agendamentos.'
            });
        }
    },

    // Buscar agendamento por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const agendamento = await Agendamento.buscarPorId(id, req.usuario.id);

            if (!agendamento) {
                return res.status(404).json({
                    mensagem: 'Agendamento não encontrado.'
                });
            }

            return res.status(200).json(agendamento);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar agendamento.'
            });
        }
    },

    // Atualizar agendamento
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { data_hora, status } = req.body;
            const statusPermitidos = [
                'Pendente',
                'Confirmado',
                'Concluído',
                'Cancelado'
            ];

            if (!data_hora || !statusPermitidos.includes(status)) {
                return res.status(400).json({
                    mensagem: 'Data, horário ou status inválido.'
                });
            }

            const agendamento = await Agendamento.atualizar(
                id,
                data_hora,
                status,
                req.usuario.id
            );

            if (!agendamento) {
                return res.status(404).json({
                    mensagem: 'Agendamento não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Agendamento atualizado com sucesso!',
                agendamento
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar agendamento.'
            });
        }
    },

    // Excluir agendamento
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const agendamento = await Agendamento.excluir(id, req.usuario.id);

            if (!agendamento) {
                return res.status(404).json({
                    mensagem: 'Agendamento não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Agendamento excluído com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir agendamento.'
            });
        }
    }
};

module.exports = agendamentoController;
