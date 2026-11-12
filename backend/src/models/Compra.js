
const pool = require('../config/database');

const Compra = {
    // Registrar uma compra
    async criar(valor_total, id_usuario, id_caixa) {
        const resultado = await pool.query(
            `INSERT INTO compra
             (valor_total, id_usuario, id_caixa)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [valor_total, id_usuario, id_caixa]
        );

        return resultado.rows[0];
    },

    // Listar compras de um usuário
    async listarPorUsuario(id_usuario) {
        const resultado = await pool.query(
            `SELECT * FROM compra
             WHERE id_usuario = $1
             ORDER BY data_criacao DESC`,
            [id_usuario]
        );

        return resultado.rows;
    },

    // Buscar compra por ID
    async buscarPorId(id, id_usuario) {
        const resultado = await pool.query(
            `SELECT * FROM compra
             WHERE id = $1 AND id_usuario = $2`,
            [id, id_usuario]
        );

        return resultado.rows[0];
    },

    // Listar todas as compras
    async listarTodas() {
        const resultado = await pool.query(
            `SELECT * FROM compra
             ORDER BY data_criacao DESC`
        );

        return resultado.rows;
    }
};

module.exports = Compra;
