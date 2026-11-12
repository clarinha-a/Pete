
const pool = require('../config/database');

const Pet = {

    // Cadastrar um pet
    async criar(nome, idade, raca, imagem, id_usuario) {
        const resultado = await pool.query(
            `INSERT INTO pet (nome, idade, raca, imagem, id_usuario)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [nome, idade, raca, imagem, id_usuario]
        );

        return resultado.rows[0];
    },

    // Listar os pets de um usuário
    async listarPorUsuario(id_usuario) {
        const resultado = await pool.query(
            `SELECT * FROM pet
             WHERE id_usuario = $1
             ORDER BY id`,
            [id_usuario]
        );

        return resultado.rows;
    },

    // Buscar um pet específico de um usuário
    async buscarPorId(id, id_usuario) {
        const resultado = await pool.query(
            `SELECT * FROM pet
             WHERE id = $1 AND id_usuario = $2`,
            [id, id_usuario]
        );

        return resultado.rows[0];
    },

    // Atualizar um pet
    async atualizar(id, nome, idade, raca, imagem, id_usuario) {
        const resultado = await pool.query(
            `UPDATE pet
             SET nome = $1, idade = $2, raca = $3, imagem = $4
             WHERE id = $5 AND id_usuario = $6
             RETURNING *`,
            [nome, idade, raca, imagem, id, id_usuario]
        );

        return resultado.rows[0];
    },

    // Excluir um pet
    async excluir(id, id_usuario) {
        const resultado = await pool.query(
            `DELETE FROM pet
             WHERE id = $1 AND id_usuario = $2
             RETURNING *`,
            [id, id_usuario]
        );

        return resultado.rows[0];
    }

};

module.exports = Pet;
