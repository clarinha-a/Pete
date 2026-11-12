
const pool = require('../config/database');

const Usuario = {

    async criar(nome, email, senha, telefone) {
        const resultado = await pool.query(
            `INSERT INTO usuario (nome, email, senha, telefone)
             VALUES ($1, $2, $3, $4)
             RETURNING id, nome, email, telefone, data_criacao`,
            [nome, email, senha, telefone]
        );

        return resultado.rows[0];
    }

};

module.exports = Usuario;
