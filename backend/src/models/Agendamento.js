
const pool = require('../config/database');

const Agendamento = {
    // Criar um agendamento
    async criar(data_hora, status, id_usuario, id_pet, id_servico, id_profissional) {
        const resultado = await pool.query(
            `INSERT INTO agendamento
             (data_hora, status, id_usuario, id_pet, id_servico, id_profissional)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [data_hora, status, id_usuario, id_pet, id_servico, id_profissional]
        );

        return resultado.rows[0];
    },

    // Listar agendamentos de um usuário
    async listarPorUsuario(id_usuario) {
        const resultado = await pool.query(
            `SELECT * FROM agendamento
             WHERE id_usuario = $1
             ORDER BY data_hora`,
            [id_usuario]
        );

        return resultado.rows;
    },

    // Buscar um agendamento específico
    async buscarPorId(id, id_usuario) {
        const resultado = await pool.query(
            `SELECT * FROM agendamento
             WHERE id = $1 AND id_usuario = $2`,
            [id, id_usuario]
        );

        return resultado.rows[0];
    },

    // Atualizar um agendamento
    async atualizar(id, data_hora, status, id_usuario) {
        const resultado = await pool.query(
            `UPDATE agendamento
             SET data_hora = $1, status = $2
             WHERE id = $3 AND id_usuario = $4
             RETURNING *`,
            [data_hora, status, id, id_usuario]
        );

        return resultado.rows[0];
    },

    // Excluir um agendamento
    async excluir(id, id_usuario) {
        const resultado = await pool.query(
            `DELETE FROM agendamento
             WHERE id = $1 AND id_usuario = $2
             RETURNING *`,
            [id, id_usuario]
        );

        return resultado.rows[0];
    }
};

module.exports = Agendamento;
