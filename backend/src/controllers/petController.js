
const Pet = require('../models/Pet');

const petController = {

    // Cadastrar um pet
    async cadastrar(req, res) {
        try {
            const { nome, idade, raca, imagem } = req.body;

            if (!nome || idade === undefined || !raca) {
                return res.status(400).json({
                    mensagem: 'Nome, idade e raça são obrigatórios.'
                });
            }

            if (!Number.isInteger(Number(idade)) || Number(idade) < 0) {
                return res.status(400).json({
                    mensagem: 'A idade deve ser um número inteiro positivo ou zero.'
                });
            }

            const novoPet = await Pet.criar(
                nome,
                Number(idade),
                raca,
                imagem || null,
                req.usuario.id
            );

            return res.status(201).json({
                mensagem: 'Pet cadastrado com sucesso!',
                pet: novoPet
            });

        } catch (erro) {
            console.error('Erro ao cadastrar pet:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao cadastrar pet.'
            });
        }
    },

    // Listar pets do usuário autenticado
    async listar(req, res) {
        try {
            const pets = await Pet.listarPorUsuario(req.usuario.id);

            return res.status(200).json(pets);

        } catch (erro) {
            console.error('Erro ao listar pets:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao listar pets.'
            });
        }
    },

    // Buscar um pet específico
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const pet = await Pet.buscarPorId(id, req.usuario.id);

            if (!pet) {
                return res.status(404).json({
                    mensagem: 'Pet não encontrado.'
                });
            }

            return res.status(200).json(pet);

        } catch (erro) {
            console.error('Erro ao buscar pet:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao buscar pet.'
            });
        }
    },

    // Atualizar um pet
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, idade, raca, imagem } = req.body;

            if (!nome || idade === undefined || !raca) {
                return res.status(400).json({
                    mensagem: 'Nome, idade e raça são obrigatórios.'
                });
            }

            if (!Number.isInteger(Number(idade)) || Number(idade) < 0) {
                return res.status(400).json({
                    mensagem: 'A idade deve ser um número inteiro positivo ou zero.'
                });
            }

            const pet = await Pet.atualizar(
                id,
                nome,
                Number(idade),
                raca,
                imagem || null,
                req.usuario.id
            );

            if (!pet) {
                return res.status(404).json({
                    mensagem: 'Pet não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Pet atualizado com sucesso!',
                pet
            });

        } catch (erro) {
            console.error('Erro ao atualizar pet:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao atualizar pet.'
            });
        }
    },

    // Excluir um pet
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const pet = await Pet.excluir(id, req.usuario.id);

            if (!pet) {
                return res.status(404).json({
                    mensagem: 'Pet não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Pet excluído com sucesso!'
            });

        } catch (erro) {
            console.error('Erro ao excluir pet:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao excluir pet.'
            });
        }
    }

};

module.exports = petController;
