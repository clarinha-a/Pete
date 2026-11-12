
const pool = require('../config/database');
const Compra = require('../models/Compra');
const ItemCompra = require('../models/ItemCompra');

const compraController = {
    // Registrar compra com seus produtos
    async cadastrar(req, res) {
        const cliente = await pool.connect();

        try {
            const { itens } = req.body;
            const id_usuario = req.usuario.id;

            if (!Array.isArray(itens) || itens.length === 0) {
                return res.status(400).json({
                    mensagem: 'Adicione pelo menos um produto à compra.'
                });
            }

            for (const item of itens) {
                if (
                    !Number.isInteger(Number(item.id_produto)) ||
                    Number(item.id_produto) <= 0 ||
                    !Number.isInteger(Number(item.quantidade)) ||
                    Number(item.quantidade) <= 0
                ) {
                    return res.status(400).json({
                        mensagem: 'Informe produtos e quantidades válidas.'
                    });
                }
            }

            await cliente.query('BEGIN');

            // Verificar se existe um caixa aberto
            const resultadoCaixa = await cliente.query(
                `SELECT id FROM caixa
                 WHERE data_fechamento IS NULL
                 ORDER BY id DESC
                 LIMIT 1
                 FOR UPDATE`
            );

            if (resultadoCaixa.rows.length === 0) {
                await cliente.query('ROLLBACK');

                return res.status(400).json({
                    mensagem: 'Não existe um caixa aberto.'
                });
            }

            const id_caixa = resultadoCaixa.rows[0].id;

            let valor_total = 0;
            const produtosCompra = [];

            // Verificar produtos e estoque
            for (const item of itens) {
                const resultadoProduto = await cliente.query(
                    `SELECT id, nome, valor, estoque
                     FROM produto
                     WHERE id = $1
                     FOR UPDATE`,
                    [item.id_produto]
                );

                if (resultadoProduto.rows.length === 0) {
                    await cliente.query('ROLLBACK');

                    return res.status(404).json({
                        mensagem: `Produto ${item.id_produto} não encontrado.`
                    });
                }

                const produto = resultadoProduto.rows[0];
                const quantidade = Number(item.quantidade);

                if (produto.estoque < quantidade) {
                    await cliente.query('ROLLBACK');

                    return res.status(400).json({
                        mensagem: `Estoque insuficiente para o produto ${produto.nome}.`
                    });
                }

                const preco_unitario = Number(produto.valor);

                valor_total += preco_unitario * quantidade;

                produtosCompra.push({
                    id_produto: produto.id,
                    quantidade,
                    preco_unitario
                });
            }

            // Registrar a compra
            const resultadoCompra = await cliente.query(
                `INSERT INTO compra
                 (valor_total, id_usuario, id_caixa)
                 VALUES ($1, $2, $3)
                 RETURNING *`,
                [valor_total, id_usuario, id_caixa]
            );

            const compra = resultadoCompra.rows[0];

            // Registrar itens e atualizar estoque
            for (const item of produtosCompra) {
                await cliente.query(
                    `INSERT INTO item_compra
                     (id_compra, id_produto, quantidade, preco_unitario)
                     VALUES ($1, $2, $3, $4)`,
                    [
                        compra.id,
                        item.id_produto,
                        item.quantidade,
                        item.preco_unitario
                    ]
                );

                await cliente.query(
                    `UPDATE produto
                     SET estoque = estoque - $1
                     WHERE id = $2`,
                    [item.quantidade, item.id_produto]
                );
            }

            await cliente.query('COMMIT');

            return res.status(201).json({
                mensagem: 'Compra registrada com sucesso!',
                compra
            });

        } catch (erro) {
            await cliente.query('ROLLBACK');

            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao registrar compra.'
            });

        } finally {
            cliente.release();
        }
    },

    // Listar compras do usuário autenticado
    async listar(req, res) {
        try {
            const compras = await Compra.listarPorUsuario(req.usuario.id);

            return res.status(200).json(compras);

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar compras.'
            });
        }
    },

    // Buscar compra e seus itens
    async buscar(req, res) {
        try {
            const { id } = req.params;

            const compra = await Compra.buscarPorId(id, req.usuario.id);

            if (!compra) {
                return res.status(404).json({
                    mensagem: 'Compra não encontrada.'
                });
            }

            const itens = await ItemCompra.listarPorCompra(id);

            return res.status(200).json({
                compra,
                itens
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar compra.'
            });
        }
    }
};

module.exports = compraController;
