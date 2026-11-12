
const Fornecedor = require('../models/Fornecedor');

const fornecedorController = {
    // Cadastrar fornecedor
    async cadastrar(req, res) {
        try {
            const { nome, cnpj, telefone } = req.body;

            if (!nome || !cnpj || !telefone) {
                return res.status(400).json({
                    mensagem: 'Preencha nome, CNPJ e telefone.'
                });
            }

            const fornecedor = await Fornecedor.criar(
                nome,
                cnpj,
                telefone
            );

            return res.status(201).json({
                mensagem: 'Fornecedor cadastrado com sucesso!',
                fornecedor
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar fornecedor.'
            });
        }
    },

    // Listar fornecedores
    async listar(req, res) {
        try {
            const fornecedores = await Fornecedor.listar();

            return res.status(200).json(fornecedores);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar fornecedores.'
            });
        }
    },

    // Buscar fornecedor por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const fornecedor = await Fornecedor.buscarPorId(id);

            if (!fornecedor) {
                return res.status(404).json({
                    mensagem: 'Fornecedor não encontrado.'
                });
            }

            return res.status(200).json(fornecedor);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar fornecedor.'
            });
        }
    },

    // Atualizar fornecedor
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, cnpj, telefone } = req.body;

            if (!nome || !cnpj || !telefone) {
                return res.status(400).json({
                    mensagem: 'Preencha nome, CNPJ e telefone.'
                });
            }

            const fornecedor = await Fornecedor.atualizar(
                id,
                nome,
                cnpj,
                telefone
            );

            if (!fornecedor) {
                return res.status(404).json({
                    mensagem: 'Fornecedor não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Fornecedor atualizado com sucesso!',
                fornecedor
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar fornecedor.'
            });
        }
    },

    // Excluir fornecedor
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const fornecedor = await Fornecedor.excluir(id);

            if (!fornecedor) {
                return res.status(404).json({
                    mensagem: 'Fornecedor não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Fornecedor excluído com sucesso!'
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir fornecedor.'
            });
        }
    }
};

module.exports = fornecedorController;
