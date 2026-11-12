
const Caixa = require('../models/Caixa');

const caixaController = {
    // Abrir caixa
    async abrir(req, res) {
        try {
            const { saldo_inicial } = req.body;

            if (saldo_inicial === undefined ||
                !Number.isFinite(Number(saldo_inicial)) ||
                Number(saldo_inicial) < 0) {
                return res.status(400).json({
                    mensagem: 'Informe um saldo inicial válido.'
                });
            }

            const caixaAberto = await Caixa.buscarAberto();

            if (caixaAberto) {
                return res.status(409).json({
                    mensagem: 'Já existe um caixa aberto.'
                });
            }

            const caixa = await Caixa.abrir(Number(saldo_inicial));

            return res.status(201).json({
                mensagem: 'Caixa aberto com sucesso!',
                caixa
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao abrir caixa.'
            });
        }
    },

    // Listar caixas
    async listar(req, res) {
        try {
            const caixas = await Caixa.listar();

            return res.status(200).json(caixas);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar caixas.'
            });
        }
    },

    // Buscar caixa por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const caixa = await Caixa.buscarPorId(id);

            if (!caixa) {
                return res.status(404).json({
                    mensagem: 'Caixa não encontrado.'
                });
            }

            return res.status(200).json(caixa);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar caixa.'
            });
        }
    },

    // Consultar caixa aberto
    async buscarAberto(req, res) {
        try {
            const caixa = await Caixa.buscarAberto();

            if (!caixa) {
                return res.status(404).json({
                    mensagem: 'Não existe caixa aberto.'
                });
            }

            return res.status(200).json(caixa);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao consultar caixa aberto.'
            });
        }
    },

    // Fechar caixa
    async fechar(req, res) {
        try {
            const { id } = req.params;
            const { saldo_final } = req.body;

            if (saldo_final === undefined ||
                !Number.isFinite(Number(saldo_final)) ||
                Number(saldo_final) < 0) {
                return res.status(400).json({
                    mensagem: 'Informe um saldo final válido.'
                });
            }

            const caixa = await Caixa.fechar(id, Number(saldo_final));

            if (!caixa) {
                return res.status(404).json({
                    mensagem: 'Caixa não encontrado ou já está fechado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Caixa fechado com sucesso!',
                caixa
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao fechar caixa.'
            });
        }
    }
};

module.exports = caixaController;
