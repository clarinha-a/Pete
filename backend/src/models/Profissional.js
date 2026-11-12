
const pool = require('../config/database');

const Profissional = {
    // Cadastrar profissional
    async criar(nome, email) {
        const resultado = await pool.query(
            `INSERT INTO profissional (nome, email)
             VALUES ($1, $2)
             RETURNING *`,
            [nome, email]
        );

        return resultado.rows[0];
    },

    // Listar profissionais
    async listar() {
        const resultado = await pool.query(
            `SELECT * FROM profissional
             ORDER BY id`
        );

        return resultado.rows;
    },

    // Buscar profissional por ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM profissional
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar profissional
    async atualizar(id, nome, email) {
        const resultado = await pool.query(
            `UPDATE profissional
             SET nome = $1, email = $2
             WHERE id = $3
             RETURNING *`,
            [nome, email, id]
        );

        return resultado.rows[0];
    },

    // Excluir profissional
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM profissional
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = Profissional;
