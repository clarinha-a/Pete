
const CampanhaMarketing = require('../models/CampanhaMarketing');

const campanhaMarketingController = {
    // Cadastrar campanha
    async cadastrar(req, res) {
        try {
            const { nome, plataforma, orcamento } = req.body;

            if (!nome || !plataforma || orcamento === undefined) {
                return res.status(400).json({
                    mensagem: 'Preencha o nome, a plataforma e o orçamento.'
                });
            }

            if (!Number.isFinite(Number(orcamento)) || Number(orcamento) < 0) {
                return res.status(400).json({
                    mensagem: 'Informe um orçamento válido.'
                });
            }

            const campanha = await CampanhaMarketing.criar(
                nome,
                plataforma,
                Number(orcamento)
            );

            return res.status(201).json({
                mensagem: 'Campanha cadastrada com sucesso!',
                campanha
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar campanha.'
            });
        }
    },

    // Listar campanhas
    async listar(req, res) {
        try {
            const campanhas = await CampanhaMarketing.listar();

            return res.status(200).json(campanhas);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar campanhas.'
            });
        }
    },

    // Buscar campanha por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const campanha = await CampanhaMarketing.buscarPorId(id);

            if (!campanha) {
                return res.status(404).json({
                    mensagem: 'Campanha não encontrada.'
                });
            }

            return res.status(200).json(campanha);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar campanha.'
            });
        }
    },

    // Atualizar campanha
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, plataforma, orcamento } = req.body;

            if (!nome || !plataforma || orcamento === undefined) {
                return res.status(400).json({
                    mensagem: 'Preencha o nome, a plataforma e o orçamento.'
                });
            }

            if (!Number.isFinite(Number(orcamento)) || Number(orcamento) < 0) {
                return res.status(400).json({
                    mensagem: 'Informe um orçamento válido.'
                });
            }

            const campanha = await CampanhaMarketing.atualizar(
                id,
                nome,
                plataforma,
                Number(orcamento)
            );

            if (!campanha) {
                return res.status(404).json({
                    mensagem: 'Campanha não encontrada.'
                });
            }

            return res.status(200).json({
                mensagem: 'Campanha atualizada com sucesso!',
                campanha
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar campanha.'
            });
        }
    },

    // Excluir campanha
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const campanha = await CampanhaMarketing.excluir(id);

            if (!campanha) {
                return res.status(404).json({
                    mensagem: 'Campanha não encontrada.'
                });
            }

            return res.status(200).json({
                mensagem: 'Campanha excluída com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir campanha.'
            });
        }
    }
};

module.exports = campanhaMarketingController;
