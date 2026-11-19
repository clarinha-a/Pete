
function validarDados(camposObrigatorios = []) {
    return (req, res, next) => {
        for (const campo of camposObrigatorios) {
            const valor = req.body[campo];

            if (valor === undefined || valor === null || valor === '') {
                return res.status(400).json({
                    erro: `O campo '${campo}' é obrigatório.`
                });
            }

            if (typeof valor === 'string') {
                if (!valor.trim()) {
                    return res.status(400).json({
                        erro: `O campo '${campo}' não pode ficar em branco.`
                    });
                }

                req.body[campo] = valor.trim();
            }
        }

        next();
    };
}

module.exports = validarDados;
