
function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: 'ID inválido na URL. Utilize um número inteiro positivo.'
        });
    }

    next();
}

module.exports = validarId;
