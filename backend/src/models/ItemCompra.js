
const pool = require('../config/database');

const ItemCompra = {
    // Adicionar item a uma compra
    async criar(id_compra, id_produto, quantidade, preco_unitario) {
        const resultado = await pool.query(
            `INSERT INTO item_compra
             (id_compra, id_produto, quantidade, preco_unitario)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id_compra, id_produto, quantidade, preco_unitario]
        );

        return resultado.rows[0];
    },

    // Listar itens de uma compra
    async listarPorCompra(id_compra) {
        const resultado = await pool.query(
            `SELECT
                item_compra.*,
                produto.nome AS nome_produto
             FROM item_compra
             JOIN produto
                ON item_compra.id_produto = produto.id
             WHERE item_compra.id_compra = $1
             ORDER BY item_compra.id`,
            [id_compra]
        );

        return resultado.rows;
    }
};

module.exports = ItemCompra;
