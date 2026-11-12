
const pool = require('../config/database');

const Fornecedor = {
    // Cadastrar fornecedor
    async criar(nome, cnpj, telefone) {
        const resultado = await pool.query(
            `INSERT INTO fornecedor (nome, cnpj, telefone)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, cnpj, telefone]
        );

        return resultado.rows[0];
    },

    // Listar todos os fornecedores
    async listar() {
        const resultado = await pool.query(
            `SELECT * FROM fornecedor
             ORDER BY id`
        );

        return resultado.rows;
    },

    // Buscar fornecedor pelo ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM fornecedor
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar fornecedor
    async atualizar(id, nome, cnpj, telefone) {
        const resultado = await pool.query(
            `UPDATE fornecedor
             SET nome = $1,
                 cnpj = $2,
                 telefone = $3
             WHERE id = $4
             RETURNING *`,
            [nome, cnpj, telefone, id]
        );

        return resultado.rows[0];
    },

    // Excluir fornecedor
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM fornecedor
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = Fornecedor;
