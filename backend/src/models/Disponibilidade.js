
const pool = require('../config/database');

const Disponibilidade = {
    // Cadastrar disponibilidade
    async criar(id_profissional, dia_semana, hora_inicio, hora_fim) {
        const resultado = await pool.query(
            `INSERT INTO disponibilidade_profissional
             (id_profissional, dia_semana, hora_inicio, hora_fim)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id_profissional, dia_semana, hora_inicio, hora_fim]
        );

        return resultado.rows[0];
    },

    // Listar disponibilidades de um profissional
    async listarPorProfissional(id_profissional) {
        const resultado = await pool.query(
            `SELECT * FROM disponibilidade_profissional
             WHERE id_profissional = $1
             ORDER BY dia_semana, hora_inicio`,
            [id_profissional]
        );

        return resultado.rows;
    },

    // Buscar disponibilidade por ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM disponibilidade_profissional
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar disponibilidade
    async atualizar(id, dia_semana, hora_inicio, hora_fim) {
        const resultado = await pool.query(
            `UPDATE disponibilidade_profissional
             SET dia_semana = $1,
                 hora_inicio = $2,
                 hora_fim = $3
             WHERE id = $4
             RETURNING *`,
            [dia_semana, hora_inicio, hora_fim, id]
        );

        return resultado.rows[0];
    },

    // Excluir disponibilidade
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM disponibilidade_profissional
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = Disponibilidade;
