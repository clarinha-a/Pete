
const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    try {
        // Receber o token enviado pelo usuário
        const autorizacao = req.headers.authorization;

        if (!autorizacao) {
            return res.status(401).json({
                mensagem: 'Token não informado.'
            });
        }

        // Separar a palavra Bearer do token
        const token = autorizacao.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                mensagem: 'Formato de token inválido.'
            });
        }

        // Verificar se o token é válido
        const dadosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Disponibilizar os dados nas próximas etapas
        req.usuario = dadosUsuario;

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
}

module.exports = autenticar;
