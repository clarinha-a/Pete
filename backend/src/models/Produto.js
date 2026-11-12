
const pool = require('../config/database');

const Produto = {
    // Cadastrar produto
    async criar(nome, categoria, valor, estoque, avaliacao, imagem, fornecedor_id) {
        const resultado = await pool.query(
            `INSERT INTO produto
             (nome, categoria, valor, estoque, avaliacao, imagem, fornecedor_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [nome, categoria, valor, estoque, avaliacao, imagem, fornecedor_id]
        );

        return resultado.rows[0];
    },

    // Listar todos os produtos
    async listar() {
        const resultado = await pool.query(
            `SELECT * FROM produto
             ORDER BY id`,
        );

        return resultado.rows;
    },

    // Buscar produto pelo ID
    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT * FROM produto
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0];
    },

    // Atualizar produto
    async atualizar(id, nome, categoria, valor, estoque, avaliacao, imagem, fornecedor_id) {
        const resultado = await pool.query(
            `UPDATE produto
             SET nome = $1,
                 categoria = $2,
                 valor = $3,
                 estoque = $4,
                 avaliacao = $5,
                 imagem = $6,
                 fornecedor_id = $7
             WHERE id = $8
             RETURNING *`,
            [nome, categoria, valor, estoque, avaliacao, imagem, fornecedor_id, id]
        );

        return resultado.rows[0];
    },

    // Excluir produto
    async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM produto
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return resultado.rows[0];
    }
};

module.exports = Produto;
