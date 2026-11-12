
const Servico = require('../models/Servico');

const servicoController = {
    // Cadastrar serviço
    async cadastrar(req, res) {
        try {
            const { nome, valor } = req.body;

            if (!nome || valor === undefined) {
                return res.status(400).json({
                    mensagem: 'Preencha o nome e o valor do serviço.'
                });
            }

            if (!Number.isFinite(Number(valor)) || Number(valor) < 0) {
                return res.status(400).json({
                    mensagem: 'Informe um valor válido para o serviço.'
                });
            }

            const servico = await Servico.criar(nome, Number(valor));

            return res.status(201).json({
                mensagem: 'Serviço cadastrado com sucesso!',
                servico
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar serviço.'
            });
        }
    },

    // Listar serviços
    async listar(req, res) {
        try {
            const servicos = await Servico.listar();

            return res.status(200).json(servicos);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar serviços.'
            });
        }
    },

    // Buscar serviço por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servico.buscarPorId(id);

            if (!servico) {
                return res.status(404).json({
                    mensagem: 'Serviço não encontrado.'
                });
            }

            return res.status(200).json(servico);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar serviço.'
            });
        }
    },

    // Atualizar serviço
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, valor } = req.body;

            if (!nome || valor === undefined) {
                return res.status(400).json({
                    mensagem: 'Preencha o nome e o valor do serviço.'
                });
            }

            if (!Number.isFinite(Number(valor)) || Number(valor) < 0) {
                return res.status(400).json({
                    mensagem: 'Informe um valor válido para o serviço.'
                });
            }

            const servico = await Servico.atualizar(
                id,
                nome,
                Number(valor)
            );

            if (!servico) {
                return res.status(404).json({
                    mensagem: 'Serviço não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Serviço atualizado com sucesso!',
                servico
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar serviço.'
            });
        }
    },

    // Excluir serviço
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servico.excluir(id);

            if (!servico) {
                return res.status(404).json({
                    mensagem: 'Serviço não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Serviço excluído com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir serviço.'
            });
        }
    }
};

module.exports = servicoController;
