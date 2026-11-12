
const Produto = require('../models/Produto');

const produtoController = {
    // Cadastrar produto
    async cadastrar(req, res) {
        try {
            const {
                nome,
                categoria,
                valor,
                estoque,
                avaliacao,
                imagem,
                fornecedor_id
            } = req.body;

            if (!nome || !categoria || valor === undefined || estoque === undefined) {
                return res.status(400).json({
                    mensagem: 'Preencha nome, categoria, valor e estoque.'
                });
            }

            if (Number(valor) < 0 || Number(estoque) < 0) {
                return res.status(400).json({
                    mensagem: 'Valor e estoque não podem ser negativos.'
                });
            }

            const produto = await Produto.criar(
                nome,
                categoria,
                Number(valor),
                Number(estoque),
                avaliacao ?? null,
                imagem ?? null,
                fornecedor_id ?? null
            );

            return res.status(201).json({
                mensagem: 'Produto cadastrado com sucesso!',
                produto
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar produto.'
            });
        }
    },

    // Listar produtos
    async listar(req, res) {
        try {
            const produtos = await Produto.listar();

            return res.status(200).json(produtos);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar produtos.'
            });
        }
    },

    // Buscar produto por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const produto = await Produto.buscarPorId(id);

            if (!produto) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            return res.status(200).json(produto);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar produto.'
            });
        }
    },

    // Atualizar produto
    async atualizar(req, res) {
        try {
            const { id } = req.params;

            const {
                nome,
                categoria,
                valor,
                estoque,
                avaliacao,
                imagem,
                fornecedor_id
            } = req.body;

            if (!nome || !categoria || valor === undefined || estoque === undefined) {
                return res.status(400).json({
                    mensagem: 'Preencha nome, categoria, valor e estoque.'
                });
            }

            if (Number(valor) < 0 || Number(estoque) < 0) {
                return res.status(400).json({
                    mensagem: 'Valor e estoque não podem ser negativos.'
                });
            }

            const produto = await Produto.atualizar(
                id,
                nome,
                categoria,
                Number(valor),
                Number(estoque),
                avaliacao ?? null,
                imagem ?? null,
                fornecedor_id ?? null
            );

            if (!produto) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!',
                produto
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar produto.'
            });
        }
    },

    // Excluir produto
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const produto = await Produto.excluir(id);

            if (!produto) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Produto excluído com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir produto.'
            });
        }
    }
};

module.exports = produtoController;
