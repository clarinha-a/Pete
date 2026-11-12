
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioController = {

    async cadastrar(req, res) {
        try {
            const { nome, email, senha, telefone } = req.body;

            // Verificar campos obrigatórios
            if (!nome || !email || !senha || !telefone) {
                return res.status(400).json({
                    mensagem: 'Preencha todos os campos obrigatórios.'
                });
            }

            // Verificar se o e-mail já está cadastrado
            const usuarioExistente = await require('../config/database').query(
                'SELECT id FROM usuario WHERE email = $1',
                [email]
            );

            if (usuarioExistente.rows.length > 0) {
                return res.status(409).json({
                    mensagem: 'Este e-mail já está cadastrado.'
                });
            }

            // Criptografar senha
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            // Cadastrar usuário
            const novoUsuario = await Usuario.criar(
                nome,
                email,
                senhaCriptografada,
                telefone
            );

            return res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!',
                usuario: novoUsuario
            });

        } catch (erro) {
            console.error('Erro ao cadastrar usuário:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao cadastrar usuário.'
            });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    mensagem: 'Informe o e-mail e a senha.'
                });
            }

            const resultado = await require('../config/database').query(
                'SELECT id, nome, email, senha FROM usuario WHERE email = $1',
                [email]
            );

            if (resultado.rows.length === 0) {
                return res.status(401).json({
                    mensagem: 'E-mail ou senha incorretos.'
                });
            }

            const usuario = resultado.rows[0];

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: 'E-mail ou senha incorretos.'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email
                },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        } catch (erro) {
            console.error('Erro ao realizar login:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno ao realizar login.'
            });
        }
    }

};


module.exports = usuarioController;
