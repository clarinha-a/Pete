
const pool = require('../config/database');

const CampanhaMarketing = {
    // Cadastrar campanha
    async criar(nome, plataforma, orcamento) {
        const resultado = await pool.query(
            `INSERT INTO campanha_marketing (nome, plataforma, orcamento)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, plataforma, orcamento]
        );

        return resultado.rows[0];
    },

    // Listar campanhas
    async listar() {
        const resultado = await pool.query(
            `SELECT * FROM campanha_marketing
             ORDER BY id DESC`
        );

        return resultado.rows;
    },

    // Buscar campanha por ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM campanha_marketing
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar campanha
    async atualizar(id, nome, plataforma, orcamento) {
        const resultado = await pool.query(
            `UPDATE campanha_marketing
             SET nome = $1,
                 plataforma = $2,
                 orcamento = $3
             WHERE id = $4
             RETURNING *`,
            [nome, plataforma, orcamento, id]
        );

        return resultado.rows[0];
    },

    // Excluir campanha
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM campanha_marketing
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = CampanhaMarketing;
