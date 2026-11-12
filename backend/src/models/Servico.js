
const pool = require('../config/database');

const Servico = {
    // Cadastrar serviço
    async criar(nome, valor) {
        const resultado = await pool.query(
            `INSERT INTO servico (nome, valor)
             VALUES ($1, $2)
             RETURNING *`,
            [nome, valor]
        );

        return resultado.rows[0];
    },

    // Listar serviços
    async listar() {
        const resultado = await pool.query(
            `SELECT * FROM servico
             ORDER BY id`
        );

        return resultado.rows;
    },

    // Buscar serviço por ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM servico
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar serviço
    async atualizar(id, nome, valor) {
        const resultado = await pool.query(
            `UPDATE servico
             SET nome = $1, valor = $2
             WHERE id = $3
             RETURNING *`,
            [nome, valor, id]
        );

        return resultado.rows[0];
    },

    // Excluir serviço
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM servico
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = Servico;
