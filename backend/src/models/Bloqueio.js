
const pool = require('../config/database');

const Bloqueio = {
    // Cadastrar bloqueio
    async criar(id_profissional, data_inicio, data_fim, motivo) {
        const resultado = await pool.query(
            `INSERT INTO bloqueio_profissional
             (id_profissional, data_inicio, data_fim, motivo)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id_profissional, data_inicio, data_fim, motivo]
        );

        return resultado.rows[0];
    },

    // Listar bloqueios de um profissional
    async listarPorProfissional(id_profissional) {
        const resultado = await pool.query(
            `SELECT * FROM bloqueio_profissional
             WHERE id_profissional = $1
             ORDER BY data_inicio`,
            [id_profissional]
        );

        return resultado.rows;
    },

    // Buscar bloqueio por ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM bloqueio_profissional
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar bloqueio
    async atualizar(id, data_inicio, data_fim, motivo) {
        const resultado = await pool.query(
            `UPDATE bloqueio_profissional
             SET data_inicio = $1,
                 data_fim = $2,
                 motivo = $3
             WHERE id = $4
             RETURNING *`,
            [data_inicio, data_fim, motivo, id]
        );

        return resultado.rows[0];
    },

    // Excluir bloqueio
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM bloqueio_profissional
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = Bloqueio;
