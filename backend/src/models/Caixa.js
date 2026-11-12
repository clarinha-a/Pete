
const pool = require('../config/database');

const Caixa = {
    // Abrir caixa
    async abrir(saldo_inicial) {
        const resultado = await pool.query(
            `INSERT INTO caixa (data_abertura, saldo_inicial)
             VALUES (CURRENT_TIMESTAMP, $1)
             RETURNING *`,
            [saldo_inicial]
        );

        return resultado.rows[0];
    },

    // Listar caixas
    async listar() {
        const resultado = await pool.query(
            `SELECT * FROM caixa
             ORDER BY id DESC`
        );

        return resultado.rows;
    },

    // Buscar caixa por ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM caixa
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Buscar caixa aberto
    async buscarAberto() {
        const resultado = await pool.query(
            `SELECT * FROM caixa
             WHERE data_fechamento IS NULL
             ORDER BY id DESC
             LIMIT 1`
        );

        return resultado.rows[0];
    },

    // Fechar caixa
    async fechar(id, saldo_final) {
        const resultado = await pool.query(
            `UPDATE caixa
             SET data_fechamento = CURRENT_TIMESTAMP,
                 saldo_final = $1
             WHERE id = $2
             AND data_fechamento IS NULL
             RETURNING *`,
            [saldo_final, id]
        );

        return resultado.rows[0];
    }
};

module.exports = Caixa;
